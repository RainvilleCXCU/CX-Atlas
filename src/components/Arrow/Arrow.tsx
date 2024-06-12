import { m, Variants } from "framer-motion";

export interface Props {
    delay?
    duration?
    route?
    variant?
    align?,
    children?
    classNames?
    style?
}

function Arrow({
    delay = 0,
    route = 'topArc',
    duration = 1,
    variant,
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {    
    const transition = { duration: duration, delay: delay, ease: 'linear'}
    const routes = {
        bottomArc: "M 8 8 C 30 20, 70 20, 95 12",
        topArc : "M 8 12 C 30 0, 70 0, 95 6"
    }
    const newVariant: Variants = {[variant]: {
        pathLength: 1,
        opacity: 1,
        display: 'block',
        transition: {
            pathLength: transition,
            opacity: transition
        }        
    }}
  return (
    <div className={`step_arrow step_arrow--${route}`}>
        <svg
            viewBox="0 0 100 20"
            id="svg1033">
            <m.path
                initial={{ pathLength: 0 }}
                animate={!variant ? { pathLength: 1 } : {}}
                transition={!variant ? {
                    pathLength: transition
                } : {}}
                variants={variant ? newVariant: {}}
                stroke={'#198754'}
                strokeDasharray='0px,0px'
                strokeWidth='.5px'
                style={{ fill: 'none', fillRule: 'evenodd' }}
                d={routes[route]}
                id="path1154"
            />
            <path
                stroke={'#FFF'}
                strokeDasharray='1, 1.5'
                strokeDashoffset='0'
                strokeWidth='8px'
                style={{ fill: 'none', fillRule: 'evenodd' }}
                d={routes[route]}
                id="path1155"
            />
            <m.path id="head" d="M 0 -1 L 2 0 L 0 1 Z"
                stroke={'#198754'} fill={'#198754'}
                initial={{opacity: 0}}
                animate={!variant ? {opacity: 1} : {}}
                transition={{delay:delay+transition.duration}}
                variants={variant ? {
                    [variant]: {
                        opacity: 1,
                        transition: {
                            opacity: {
                                delay:delay+transition.duration
                            }
                        }
                    }
                }: {}}
            >
                <animateMotion 
                    dur={`${0.000001}s`}
                    begin={`${delay+transition.duration}s`}
                    rotate={'auto'}
                    fill="freeze"
                    path={routes[route]}>
                </animateMotion>
            </m.path>
        </svg>
    </div>
  );
}

export default Arrow;
