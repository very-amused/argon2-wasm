# Build argon2 without thread.c, and disable threading support
# Enabling threading would require clientside code written for shared array buffers between web workers,
# which are still disabled in many major browsers (opera, safari, all mobile browsers except firefox android)
# Until proper support for multithreading is more solid among browsers, it is irresponsible to not disable threads in builds
O=-O3
OUTDIR=build
ARGON2_SRC=argon2,core,encoding,blake2/blake2b
LINK=-I argon2/include
EXPORTED_FUNCTIONS=_malloc,_free,_argon2i_hash_raw
CFLAGS=$(O) -Wall -g --no-entry -DARGON2_NO_THREADS \
	-s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s MAXIMUM_MEMORY=$(MAXIMUM_MEMORY) \
	-s MEMORY_GROWTH_GEOMETRIC_STEP=$(MEMORY_GROWTH_GEOMETRIC_STEP) \
	-s MEMORY_GROWTH_GEOMETRIC_CAP=$(MEMORY_GROWTH_GEOMETRIC_CAP)
EMCC=emcc $(CFLAGS) $(LINK)

# Maximum size the buffer can grow to
MAXIMUM_MEMORY=$(shell echo $$((4 * 1024 * 1024 * 1024)))
# Geometric ratio used for memory growth
MEMORY_GROWTH_GEOMETRIC_STEP=1
# Maximum size of a single memory growth operation
MEMORY_GROWTH_GEOMETRIC_CAP=$(shell echo $$((1024 * 1024 * 1024)))

all: build-dir no-simd simd feature-detect

build-dir:
	[ -d "$(OUTDIR)" ] || mkdir "$(OUTDIR)"

# Build regular webasm, this should load properly and perform well on all major browsers
no-simd:
	$(EMCC) argon2/src/{$(ARGON2_SRC),ref}.c -o $(OUTDIR)/argon2.wasm

# Build webasm with SSE2 instruction set (the created build is much faster but almost useless on most major browsers right now)
simd:
	$(EMCC) argon2/src/{$(ARGON2_SRC),opt}.c -msimd128 -msse2 -o $(OUTDIR)/argon2-simd.wasm

feature-detect:
	wat2wasm --enable-simd src/feature-tests/simd.wat -o $(OUTDIR)/simd-test.wasm

clean:
	rm -f $(OUTDIR)/*.wasm
