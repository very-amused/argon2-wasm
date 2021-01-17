# Build argon2 without thread.c, and disable threading support
# Enabling threading would require clientside code written for shared array buffers between web workers,
# which are still disabled in many major browsers (opera, safari, all mobile browsers except firefox android)
# Until proper support for multithreading is more solid among browsers, it is irresponsible to not disable threads in builds
O=-O3
OUTDIR=out
ARGON2_SRC=argon2,core,encoding,blake2/blake2b
LINK=-I argon2/include argon2/src/{$(ARGON2_SRC)}.c
EXPORTED_FUNCTIONS="['_malloc', '_free', '_argon2i_hash_raw', '_argon2d_hash_raw', '_argon2id_hash_raw']"
CFLAGS=$(O) -Wall -g --no-entry -s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) -s ALLOW_MEMORY_GROWTH=1 -DARGON2_NO_THREADS
EMCC=emcc $(CFLAGS) $(LINK)

# Build regular webasm, this should load properly and perform well on all major browsers
all: no-simd simd feature-detect

no-simd:
	$(eval ARGON2_SRC_OLD:=$(ARGON2_SRC))
	$(eval ARGON2_SRC:=$(ARGON2_SRC),ref)
	$(EMCC) -o $(OUTDIR)/argon2.wasm
	$(eval ARGON2_SRC:=$(ARGON2_SRC_OLD))

# Build webasm with SSE2 instruction set (the created build is much faster but almost useless on most major browsers right now)
simd:
	$(eval ARGON2_SRC_OLD:=$(ARGON2_SRC))
	$(eval ARGON2_SRC:=$(ARGON2_SRC),opt)
	$(eval CFLAGS+=-msimd128 -msse2)
	$(EMCC) -o $(OUTDIR)/argon2-simd.wasm
	$(eval ARGON2_SRC:=$(ARGON2_SRC_OLD))

feature-detect:
	wat2wasm --enable-simd src/feature-tests/simd.wat -o $(OUTDIR)/simd-test.wasm

clean:
	rm -f out/*
