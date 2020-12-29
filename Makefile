INPUT=src/main.c
OUTPUT=out/argon2.wasm

O=-O3
LINK=-I argon2/include -L argon2 -l argon2
CFLAGS=-std=c89 $(O) -Wall -g -Iinclude -Isrc -pthread
EMCC=emcc $(O) -Wall --no-entry $(LINK) $(INPUT) -o $(OUTPUT)

# Build regular webasm, this should load properly and perform well on all major browsers
all:
	cd argon2 && emcc $(CFLAGS) -c -o src/argon2.o src/argon2.c
	cd argon2 && emcc $(CFLAGS) -c -o src/core.o src/core.c
	cd argon2 && emcc $(CFLAGS) -c -o src/blake2/blake2b.o src/blake2/blake2b.c
	cd argon2 && emcc $(CFLAGS) -c -o src/thread.o src/thread.c
	cd argon2 && emcc $(CFLAGS) -c -o src/encoding.o src/encoding.c
	cd argon2 && emcc $(CFLAGS) -c -o src/ref.o src/ref.c
	cd argon2 && emar rcs libargon2.a src/argon2.o src/core.o src/blake2/blake2b.o src/thread.o src/encoding.o src/ref.o
	$(EMCC)

# Build webasm with SSE2 instruction set (the created build is much faster but almost useless on most major browsers right now)
simd:
	$(eval CFLAGS+=-msimd128 -msse2)
	$(eval OUTPUT=out/argon2-simd.wasm)
	cd argon2 && emcc $(CFLAGS) -c -o src/argon2.o src/argon2.c
	cd argon2 && emcc $(CFLAGS) -c -o src/core.o src/core.c
	cd argon2 && emcc $(CFLAGS) -c -o src/blake2/blake2b.o src/blake2/blake2b.c
	cd argon2 && emcc $(CFLAGS) -c -o src/thread.o src/thread.c
	cd argon2 && emcc $(CFLAGS) -c -o src/encoding.o src/encoding.c
	cd argon2 && emcc $(CFLAGS) -c -o src/opt.o src/opt.c
	cd argon2 && emar rcs libargon2.a src/argon2.o src/core.o src/blake2/blake2b.o src/thread.o src/encoding.o src/opt.o
	$(EMCC)

clean:
	cd argon2 && rm -f libargon2.a src/argon2.o src/core.o src/blake2/blake2b.o src/thread.o src/encoding/o src/ref.o
	rm -f out/*
