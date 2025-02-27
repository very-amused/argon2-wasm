/*
 * @license
 * Base64 implementation from cs-crypto and nc-crypto
 * MIT License
 * Copyright (c) 2023, 2025 Keith Scroggs
 */

// Only standard encoding is supported as of now
const StdEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/**
 * @internal
 * Encode up to 3 bytes from data into result
 */
function encodeGroup(data: Uint8Array, result: Uint8Array): void {
	// Byte 1
	result[0] = StdEncoding.charCodeAt(data[0] >> 2)

	// Byte 2
	if (data.byteLength === 1) {
		result[1] = StdEncoding.charCodeAt(data[0] << 4 & 0x30)
		return
	}
	result[1] = StdEncoding.charCodeAt(data[0] << 4 & 0x30 | data[1] >> 4)

	// Byte 3
	if (data.byteLength === 2) {
		result[2] = StdEncoding.charCodeAt(data[1] << 2 & 0x3C)
		return
	}
	result[2] = StdEncoding.charCodeAt(data[1] << 2 & 0x3C | data[2] >> 6)

	// Byte 4
	result[3] = StdEncoding.charCodeAt(data[2] & 0x3F)
}

/**
 * @internal
 * Decode a group of base64 indexes to result
 */
function decodeGroup(data: Uint8Array, result: Uint8Array): void {
	// Byte 1
	result[0] = data[0] << 2 | data[1] >> 4
	if (result.byteLength === 1) {
		return
	}

	// Byte 2
	result[1] = data[1] << 4 | data[2] >> 2
	if (result.byteLength === 2) {
		return
	}

	// Byte 3
	result[2] = data[2] << 6 | data[3]
}

/**
 * @internal
 * ASCII to indexes, convert each ASCII character code in encoded to a usable index for decoding
 */
function atoi(encoded: Uint8Array): Uint8Array {
	let unpaddedLength = encoded.byteLength
	// Strip up to 2 padding characters off the end
	for (let i = encoded.byteLength - 2; i < encoded.byteLength; i++) {
		if (encoded[i] === '='.charCodeAt(0)) {
			unpaddedLength--
		}
	}

	const indexes = new Uint8Array(unpaddedLength)
	// Convert from ASCII character codes to 0-63
	for (let i = 0; i < unpaddedLength; i++) {
		if (encoded[i] >= 48 && encoded[i] <= 57) {
			// 0-9
			indexes[i] = encoded[i] + 4
		} else if (encoded[i] >= 65 && encoded[i] <= 90) {
			// A-Z
			indexes[i] = encoded[i] - 65
		} else if (encoded[i] >= 97 && encoded[i] <= 122) {
			// a-z
			indexes[i] = encoded[i] - 71
		} else {
			// What's done for symbols is encoding-dependent
			if (encoded[i] === 43) {
				indexes[i] = 62
				// /
			} else if (encoded[i] === 47) {
				indexes[i] = 63
			} else {
				throw new Error('invalid base64 input (StdEncoding)')
			}
		}
	}
	return indexes
}

export namespace Base64 {

/**
 * Encode a Uint8Array using Base64.
 */
export function encode(data: Uint8Array, padding = true): string {
	// Calculate encoded size and rem (trailing bytes) size
  const dataRem = data.byteLength % 3
  let encRem = 0
  if (dataRem > 0) {
    encRem = padding ? 4 : dataRem + 1
  }
	const encSize = (Math.floor(data.byteLength / 3) * 4) + encRem
	const encoded = new Uint8Array(encSize)

	// i is the offset from the beginning of data,
	// j is the offset from the beginning of encoded
	let i = 0
	let j = 0
	// Encode all possible groups of 3 bytes
	for (; i < data.byteLength - 2; i += 3, j += 4) {
		encodeGroup(
			new Uint8Array(data.buffer, i, 3),
			new Uint8Array(encoded.buffer, j, 4)
		)
	}

	// Encode trailing bytes and add padding
  if (dataRem > 0) {
    const rTrailSize = dataRem + 1 // # of actual trailing encoded bytes, the rest is optional padding
    const dTrail = new Uint8Array(data.buffer, data.byteLength - dataRem, dataRem)
    const encTrail = new Uint8Array(encoded.buffer, encSize - encRem, rTrailSize)

    // Encode trail data
    encodeGroup(dTrail, encTrail)
    // Encode trail padding
    const paddingSize = encRem - rTrailSize // Will be 0 if padding == false
    for (let i = encSize - paddingSize; i < encSize; i++) {
      encoded[i] = '='.charCodeAt(0)
    }
  }

	// Finally, encode the Uint8Array as a UTF-8 string
  // (yes, TextDecoder is used to encode text and TextEncoder is used to decode text. They're backwards.)
	return new TextDecoder().decode(encoded)
}

/**
 * Decode Base64 to a Uint8Array.
 */
export function decode(encoded: string): Uint8Array {
	// Convert from ASCII encoding to indexes 0-63 and strip padding
	const indexes = atoi(new TextEncoder().encode(
		encoded.replaceAll(/[\r\n]/g, '') // Standard base64 behavior requires ignoring newlines
	))

	// Calculate decoded size and rem
  const idRem  = indexes.byteLength % 4 // Trailing bytes without padding
  const dataRem = idRem > 0 ? idRem - 1 : 0
	const dataSize = (Math.floor(indexes.byteLength / 4) * 3) + dataRem
	const data = new Uint8Array(dataSize)

	// Decode each group of 4 characters -> 3 bytes
	// i is the offset from the beginning of indexes
	// j is the offset from the beginning of data
	let i = 0
	let j = 0
	for (; i < indexes.byteLength - 3; i += 4, j += 3) {
		decodeGroup(
			new Uint8Array(indexes.buffer, i, 4),
			new Uint8Array(data.buffer, j, 3)
		)
	}

  // Decode trailing bytes
  if (dataRem > 0) {
    const idTrail = new Uint8Array(indexes.buffer, indexes.byteLength - idRem, idRem)
    const dTrail = new Uint8Array(data.buffer, dataSize - dataRem, dataRem)

    // Decode trail data
    decodeGroup(idTrail, dTrail)
  }

	return data
}

}
