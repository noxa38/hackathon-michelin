import { useEffect, useState } from 'react'
import styles from './IntroAnimation.module.css'

const SESSION_KEY = 'michelin-intro-shown'

/*
  Michelin 6-petal flower silhouette, centered at (0,0).
  Computed with cubic bezier curves:
    - 6 petal tips at R=44, every 60° starting from top
    - 6 valley points at r=18, offset 30° between each tip
    - delta_peak = 0.55 × dist  → wide, rounded petal tops
    - delta_valley = 0.40 × dist → smooth valley transitions
  The path traces the outer boundary only (no inner hole),
  so the fill covers the entire flower including the center.
*/
const MICHELIN_PATH =
  'M 0,-44 ' +
  'C 16.4,-44 -1.3,-21.6 9,-15.6 ' +
  'C 19.3,-9.6 29.9,-36.2 38.1,-22 ' +
  'C 46.3,-7.8 18,-11.9 18,0 ' +
  'C 18,11.9 46.3,7.8 38.1,22 ' +
  'C 29.9,36.2 19.3,9.6 9,15.6 ' +
  'C -1.3,21.6 16.4,44 0,44 ' +
  'C -16.4,44 1.3,21.6 -9,15.6 ' +
  'C -19.3,9.6 -29.9,36.2 -38.1,22 ' +
  'C -46.3,7.8 -18,11.9 -18,0 ' +
  'C -18,-11.9 -46.3,-7.8 -38.1,-22 ' +
  'C -29.9,-36.2 -19.3,-9.6 -9,-15.6 ' +
  'C 1.3,-21.6 -16.4,-44 0,-44 Z'

export default function IntroAnimation() {
  const [active, setActive] = useState(() => !sessionStorage.getItem(SESSION_KEY))

  useEffect(() => {
    if (!active) return
    sessionStorage.setItem(SESSION_KEY, '1')
    const id = setTimeout(() => setActive(false), 2900)
    return () => clearTimeout(id)
  }, [active])

  if (!active) return null

  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="intro-star-mask">
            {/*
              White = red overlay visible | Black = transparent hole → site visible.
              The flower path is scale(0) from the start (no 1-frame flash),
              then grows via animateTransform from 0 to 12 — at scale 12 it
              covers any screen size, making the red fully disappear.
            */}
            <rect x="-1000" y="-1000" width="2000" height="2000" fill="white" />
            <g transform="translate(50 50)">
              <path d={MICHELIN_PATH} fill="black" transform="scale(0)">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="0;0;12"
                  keyTimes="0;0.43;1"
                  keySplines="0 0 1 1;0.4 0 0.2 1"
                  calcMode="spline"
                  begin="0s"
                  dur="2.3s"
                  fill="freeze"
                />
              </path>
            </g>
          </mask>
        </defs>

        <rect
          x="-1000" y="-1000"
          width="2000" height="2000"
          fill="#E4002B"
          mask="url(#intro-star-mask)"
        />
      </svg>

      <div className={styles.brand}>
        <span className={styles.brandText}>MICHELIN</span>
        <span className={styles.brandSub}>Guide</span>
      </div>
    </div>
  )
}
