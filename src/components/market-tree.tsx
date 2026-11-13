"use client";

import { useRef } from "react";
import styles from "./market-tree.module.css";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const SEGMENT_LANDINGS = new Map<string, { href: string; name: string }>([
  ["Autoel\u00e9trica", { href: "https://mboficina.mentebinaria.com/landing", name: "MB Garage" }],
  ["Oficina", { href: "https://mboficina.mentebinaria.com/landing", name: "MB Garage" }],
  ["Lava-jato", { href: "https://lavajato-steel.vercel.app/landing", name: "Lava-jato" }],
  ["Roupas", { href: "https://mbcloset.vercel.app/landing", name: "MB Closet" }],
]);

const ROW_HEIGHT = 64;
const CENTER_Y = 32;

function MarketBranch({ business, index, total, progress, reducedMotion, onSelect }: {
  business: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  onSelect: (business: string) => void;
}) {
  const landing = SEGMENT_LANDINGS.get(business);
  const nodeContent = (
    <>
      <span className={styles["market-node-light"]} aria-hidden="true" />
      <span>{business}</span>
      {landing && <span className={styles["market-node-badge"]}>{landing.name}</span>}
      <span className={styles["market-node-arrow"]} aria-hidden="true">&#8599;</span>
    </>
  );
  const start = 0.08 + index * (0.82 / total);
  const end = start + 0.82 / total;
  const trunk = useTransform(progress, [start, start + (end - start) * 0.55], [0, 1]);
  const branch = useTransform(progress, [start + (end - start) * 0.45, end], [0, 1]);
  const opacity = useTransform(progress, [start + (end - start) * 0.7, end + 0.04], [0, 1]);
  const rotateX = useTransform(progress, [start, end + 0.04], [35, 0]);
  const x = useTransform(progress, [start, end + 0.04], [-16, 0]);
  const y = CENTER_Y + (index + 1) * ROW_HEIGHT;
  const previousY = y - ROW_HEIGHT;
  const trunkPath = index === 0
    ? `M 90 32 H 52 Q 32 32 32 52 V ${y}`
    : `M 32 ${previousY} V ${y}`;

  return (
    <>
      <svg className={styles["market-tree-wires"]} fill="none" stroke="currentColor" aria-hidden="true">
        <motion.path fill="none" d={trunkPath} style={{ pathLength: reducedMotion ? 1 : trunk }} />
        <motion.path fill="none" d={`M 32 ${y} H 90`} style={{ pathLength: reducedMotion ? 1 : branch }} />
        <motion.circle cx="32" cy={y} r="3" style={{ opacity: reducedMotion ? 1 : branch }} />
      </svg>
      <motion.div
        className={styles["market-branch-node"]}
        style={{ top: y - CENTER_Y, opacity: reducedMotion ? 1 : opacity, rotateX: reducedMotion ? 0 : rotateX, x: reducedMotion ? 0 : x }}
      >
        {landing ? (
          <a
            href={landing.href}
            className={`${styles["market-business"]} ${styles["market-business-live"]}`}
            aria-label={`${business}: conhecer ${landing.name}`}
          >
            {nodeContent}
          </a>
        ) : (
          <button type="button" className={styles["market-business"]} onClick={() => onSelect(business)}>
            {nodeContent}
          </button>
        )}
      </motion.div>
    </>
  );
}

export function MarketTree({ group, businesses, onSelect }: {
  group: string;
  businesses: string[];
  onSelect: (business: string) => void;
}) {
  const treeRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: treeRef,
    offset: ["start 90%", "end 65%"],
  });
  const rootOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const rootY = useTransform(scrollYProgress, [0, 0.08], [18, 0]);

  return (
    <article ref={treeRef} className={styles["market-tree"]} aria-label={`Segmentos de ${group}`} style={{ height: (businesses.length + 1) * ROW_HEIGHT }}>
      <motion.h3 className={styles["market-group"]} style={{ opacity: reducedMotion ? 1 : rootOpacity, y: reducedMotion ? 0 : rootY }}>
        <span className={styles["market-root-icon"]} aria-hidden="true">&#10022;</span>
        {group}
      </motion.h3>
      {businesses.map((business, index) => (
        <MarketBranch key={business} business={business} index={index} total={businesses.length} progress={scrollYProgress} reducedMotion={!!reducedMotion} onSelect={onSelect} />
      ))}
    </article>
  );
}
