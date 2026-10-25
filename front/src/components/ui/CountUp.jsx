import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Numero que cuenta desde 0 hasta `to` cuando entra en pantalla
export default function CountUp({ to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const control = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => control.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{valor}{suffix}
    </span>
  );
}
