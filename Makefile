# Build argon2 without thread.c, and disable threading support
# Enabling threading would require clientside code written for shared array buffers between web workers,
# which have been very recently re-enabled for most mobile browsers (with the requirement of COOP and COEP security headers). 
# The major remaining hurdle before this build will support multithreading is the release of iOS 16, which will move a majority of iOS users onto the latest version of Safari, which supports shared array buffers
O=-O3
CFLAGS=$(O) -Wall -I argon2/include
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
# Use available # of threads
BUILD_FLAGS_PTHREAD=-pthread -s PTHREAD_POOL_SIZE=navigator.hardwareConcurrency

src=argon2/src/argon2.c argon2/src/core.c argon2/src/encoding.c argon2/src/blake2/blake2b.c
src-ref=argon2/src/ref.c
src-simd=argon2/src/opt.c
src-pthread=argon2/src/thread.c
objects=$(src:.c=.wasm.o)
objects-ref=$(src-ref:.c=.wasm.o)
objects-simd=$(src-simd:.c=.wasm.o)
objects-pthread=$(src:.c=.pthread.wasm.o) $(src-pthread:.c=.pthread.wasm.o)
objects-ref-pthread=$(src-ref:.c=.pthread.wasm.o)
objects-simd-pthread=$(src-simd:.c=.pthread.wasm.o)

outdir=build
# Create build dir
$(shell if [ ! -d $(outdir) ]; then mkdir $(outdir); fi)
argon2=$(outdir)/argon2.wasm
argon2-simd=$(outdir)/argon2-simd.wasm
argon2-pthread=$(outdir)/argon2-pthread.js
argon2-simd-pthread=$(outdir)/argon2-simd-pthread.js
feature-detect=$(outdir)/simd-test.wasm

# Runtime vars
nodebin=node_modules/.bin

all: $(outdir) .WAIT $(argon2) $(argon2-simd) $(argon2-pthread) $(argon2-simd-pthread) $(feature-detect) runtime
.PHONY: all

release: clean .WAIT all .WAIT docs demo
.PHONY: release

$(outdir):
	mkdir $(outdir)

$(argon2): $(objects) $(objects-ref)
	emcc -o $(argon2) $(objects) $(objects-ref) $(CFLAGS) $(BUILD_FLAGS)

$(argon2-simd): $(objects) $(objects-simd)
	emcc -o $(argon2-simd) $(objects) $(objects-simd) $(CFLAGS) $(BUILD_FLAGS)

$(argon2-pthread): $(objects-pthread) $(objects-ref-pthread)
	emcc -o $(argon2-pthread) $(objects-pthread) $(objects-ref-pthread) $(CFLAGS) $(BUILD_FLAGS) $(BUILD_FLAGS_PTHREAD)

$(argon2-simd-pthread): $(objects-pthread) $(objects-simd-pthread)
	emcc -o $(argon2-simd-pthread) $(objects-pthread) $(objects-simd-pthread) $(CFLAGS) $(BUILD_FLAGS) $(BUILD_FLAGS_PTHREAD)

$(feature-detect): src/feature-tests/simd.wat
	wat2wasm src/feature-tests/simd.wat -o $(feature-detect)

$(objects-simd): $(src-simd)
	emcc -c -o $@ $< $(CFLAGS) -msimd128 -msse2

$(objects-simd-pthread): $(src-simd)
	emcc -c -o $@ $< $(CFLAGS) -msimd128 -msse2 -pthread

argon2/src/%.wasm.o: argon2/src/%.c
	emcc -c -o $@ $< $(CFLAGS) -DARGON2_NO_THREADS

argon2/src/%.pthread.wasm.o: argon2/src/%.c
	emcc -c -o $@ $< $(CFLAGS) -pthread

runtime:
	mkdir runtime
	$(nodebin)/rollup -c
	$(nodebin)/tsc -b tsconfig-d.json
.PHONY: runtime

docs:
	$(nodebin)/typedoc --plugin typedoc-plugin-markdown --readme docs_readme.md src/index.ts --out docs/
.PHONY: docs

demo: runtime
	$(nodebin)/snowpack build
.PHONY: demo

clean:
	rm -rf $(objects) $(objects-pthread) $(objects-ref) $(objects-simd) $(outdir) runtime
.PHONY: clean
