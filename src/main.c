#include <stdlib.h>
#include "argon2.h"
#include <emscripten.h>

// Map memory functionss
EMSCRIPTEN_KEEPALIVE
void *malloc_buffer(size_t size) {
  return malloc(size);
}

EMSCRIPTEN_KEEPALIVE
void free_buffer(void *ptr) {
 free(ptr);
}

// Hash function - 2i version
EMSCRIPTEN_KEEPALIVE
int hash_2i(
  const uint32_t t_cost, // Time cost
  const uint32_t m_cost, // Memory cost
  const uint32_t parallelism, // Parallelism factor
  const void *pwd, // Password pointer
  const size_t pwdlen, // Password length in bytes
  const void *salt, // Salt pointer
  const size_t saltlen, // Salt length in bytes
  void *hash, // Hash pointer
  const size_t hashlen // hash length
) {
  return argon2i_hash_raw(t_cost, m_cost, parallelism, pwd, pwdlen, salt, saltlen, hash, hashlen);
}
