# Build argon2 without thread.c, and disable threading support
# Enabling threading would require clientside code written for shared array buffers between web workers,
# which have been very recently re-enabled for most mobile browsers (with the requirement of COOP and COEP security headers). 
# The major remaining hurdle before this build will support multithreading is the release of iOS 16, which will move a majority of iOS users onto the latest version of Safari, which supports shared array buffers
O=-O3
CFLAGS=$(O) -Wall -DARGON2_NO_THREADS -I argon2/include
EXPORTED_FUNCTIONS=_malloc,_free,_argon2i_hash_raw

# Maximum size the buffer can grow to
MAXIMUM_MEMORY=$(shell echo $$((4 * 1024 * 1024 * 1024)))
# Geometric ratio used for memory growth
MEMORY_GROWTH_GEOMETRIC_STEP=1
# Maximum size of a single memory growth operation
MEMORY_GROWTH_GEOMETRIC_CAP=$(shell echo $$((1024 * 1024 * 1024)))

BUILD_FLAGS=--no-entry \
	-s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s MAXIMUM_MEMORY=$(MAXIMUM_MEMORY) \
	-s MEMORY_GROWTH_GEOMETRIC_STEP=$(MEMORY_GROWTH_GEOMETRIC_STEP) \
	-s MEMORY_GROWTH_GEOMETRIC_CAP=$(MEMORY_GROWTH_GEOMETRIC_CAP)

src=argon2/src/argon2.c argon2/src/core.c argon2/src/encoding.c argon2/src/blake2/blake2b.c
src-ref=argon2/src/ref.c
src-simd=argon2/src/opt.c
objects=$(src:.c=.wasm.o)
objects-ref=$(src-ref:.c=.wasm.o)
objects-simd=$(src-simd:.c=.wasm.o)

outdir=build
# Create build dir
$(shell if [ ! -d $(outdir) ]; then mkdir $(outdir); fi)
argon2=$(outdir)/argon2.wasm
argon2-simd=$(outdir)/argon2-simd.wasm
feature-detect=$(outdir)/simd-test.wasm

all: $(argon2) $(argon2-simd) $(feature-detect)

$(argon2): $(objects) $(objects-ref)
	emcc -o $(argon2) $(objects) $(objects-ref) $(CFLAGS) $(BUILD_FLAGS)

$(argon2-simd): $(objects) $(objects-simd)
	emcc -o $(argon2-simd) $(objects) $(objects-simd) $(CFLAGS) $(BUILD_FLAGS)

$(feature-detect): src/feature-tests/simd.wat
	wat2wasm --enable-simd src/feature-tests/simd.wat -o $(feature-detect)

$(objects-simd): $(src-simd)
	emcc -c -o $@ $< $(CFLAGS) -msimd128 -msse2

argon2/src/%.wasm.o: argon2/src/%.c
	emcc -c -o $@ $< $(CFLAGS)

clean:
	rm -rf $(objects) $(objects-ref) $(objects-simd) $(outdir)
