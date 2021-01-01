INPUT=src/main.c
OUTPUT=out/argon2.wasm

# Build argon2 without thread.c, and disable threading support
# Enabling threading would require clientside code written for shared array buffers between web workers,
# which are still disabled in many major browsers (opera, safari, all mobile browsers except firefox android)
# Until proper support for multithreading is more solid among browsers, it is irresponsible to not disable threads in builds
O=-O3
ARGON2_SRC=argon2,core,encoding,blake2/blake2b
LINK=-I argon2/include argon2/src/{$(ARGON2_SRC)}.c
CFLAGS=$(O) -Wall -g --no-entry -s ALLOW_MEMORY_GROWTH=1 -DARGON2_NO_THREADS
EMCC=emcc $(CFLAGS) $(LINK) $(INPUT) -o $(OUTPUT)

# Build regular webasm, this should load properly and perform well on all major browsers
all:
	$(eval ARGON2_SRC:=$(ARGON2_SRC),ref)
	$(EMCC)

# Build webasm with SSE2 instruction set (the created build is much faster but almost useless on most major browsers right now)
simd:
	$(eval ARGON2_SRC:=$(ARGON2_SRC),opt)
	$(eval CFLAGS+=-msimd128 -msse2)
	$(EMCC)

clean:
	cd argon2 && rm -f libargon2.a src/argon2.o src/core.o src/blake2/blake2b.o src/thread.o src/encoding/o src/ref.o
	rm -f out/*
