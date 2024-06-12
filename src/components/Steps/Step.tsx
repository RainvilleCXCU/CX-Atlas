import Arrow from "components/Arrow/Arrow";
import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import { parseHtml } from "lib/parser";

export interface Props {
    step?
    lastStep?
    route?
    align?,
    children?
    classNames?
    style?
}

function Step({
    step = 1,
    lastStep = false,
    route = 'topArc',
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {    
  return (

    <motion.div
      className="step"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.6 }}
    >
            <motion.div
                className="step__number"
                initial={{ opacity: 0 }}
                variants={{
                    onscreen: {
                        opacity: .99,
                        transition:{delay:step - 1, duration:.5}
                    }
                }}
            >
                {step}
            </motion.div>
            {!lastStep && 
                <Arrow delay={step-1} route={route} duration={1} variant={'onscreen'} />
            }
            <motion.p
                className="step__content"
                initial={{ opacity: 0 }}
                variants={{
                    onscreen: {
                        opacity: .99,
                        transition:{delay:step-1, duration:.5}
                    }
                }}
            >
                {children}
            </motion.p>
    </motion.div>
  );
}

export default Step;
