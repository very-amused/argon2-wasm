;; Will fail WebAssembly.validate unless SIMD is supported
(module
  (func
    i32.const 0
    i8x16.splat
    drop
  )
)
