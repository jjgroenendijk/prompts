## 2025-03-03 - O(N^2) Complexity Traps in React Renders
**Learning:** Using array iteration methods like `.find()` or `.includes()` inside loops or `.map()` / `.every()` operations during React renders can silently introduce O(N^2) complexity. This causes severe performance degradation on large datasets or frequent re-renders.
**Action:** Always refactor iterative O(N) lookup operations inside loops into O(1) Map/Set structures using `useMemo()`. Convert `.find()` lookup targets into `Maps` and `.includes()` checking arrays into `Sets`.
