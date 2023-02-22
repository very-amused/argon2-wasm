O=-O3
CFLAGS=$(O) -Wall -Wno-pthreads-mem-growth -I argon2/include
EXPORTED_FUNCTIONS=_malloc,_free,_argon2i_hash_raw

# Initial memory buffer size, matched with created JS buffer
unjsonc=sed -e '/^\s*\/\//d'
INITIAL_MEMORY=$(shell cat src/memory-params.jsonc | $(unjsonc) | jq .initialMemory)
# Maximum size the buffer can grow to, must be matched with created JS buffer
MAXIMUM_MEMORY=$(shell cat src/memory-params.jsonc | $(unjsonc) | jq .maximumMemory)
# Geometric ratio used for memory growth
MEMORY_GROWTH_GEOMETRIC_STEP=1
# Maximum size of a single memory growth operation
MEMORY_GROWTH_GEOMETRIC_CAP=$(shell echo $$((1024 * 1024 * 1024)))

BUILD_FLAGS=--no-entry \
	-s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS) \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s INITIAL_MEMORY=$(INITIAL_MEMORY) \
	-s MAXIMUM_MEMORY=$(MAXIMUM_MEMORY) \
	-s MEMORY_GROWTH_GEOMETRIC_STEP=$(MEMORY_GROWTH_GEOMETRIC_STEP) \
	-s MEMORY_GROWTH_GEOMETRIC_CAP=$(MEMORY_GROWTH_GEOMETRIC_CAP)
# Use available # of threads
BUILD_FLAGS_PTHREAD=-pthread \
	-s PTHREAD_POOL_SIZE=navigator.hardwareConcurrency \
	-s MODULARIZE \
	-s EXPORT_NAME=LoadArgon2Wasm

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

all: $(argon2) $(argon2-simd) $(argon2-pthread) $(argon2-simd-pthread) $(feature-detect) runtime
.PHONY: all

release: clean .WAIT all .WAIT docs demo
.PHONY: release

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
	[ -d runtime ] || mkdir runtime
	$(nodebin)/rollup -c
	$(nodebin)/tsc -b tsconfig-d.json
.PHONY: runtime

docs:
	$(nodebin)/typedoc --plugin typedoc-plugin-markdown --readme docs_readme.md src/index.ts --out docs/
.PHONY: docs

demo-runtime: all
	mkdir -p demo/public/argon2
	cp -r build/* demo/public/argon2/
	mkdir -p demo/public/runtime
	cp -r runtime demo/public/runtime/
.PHONY: demo-runtime

demo: demo-runtime
	$(nodebin)/vite build
.PHONY: demo

run-demo: demo-runtime
	$(nodebin)/vite serve
.PHONY: run-demo

clean:
	rm -rf $(objects) $(objects-ref) $(objects-simd) $(objects-simd) $(objects-pthread) $(objects-ref-pthread) $(objects-simd-pthread) $(outdir) runtime
.PHONY: clean
