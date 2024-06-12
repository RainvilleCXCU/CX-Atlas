import Arrow from "components/Arrow/Arrow";
import Column from "components/Blocks/Column";
import Columns from "components/Blocks/Columns";
import Container from "components/Blocks/Container";
import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import Step from "./Step";

export interface Props {
    delay?
    route?
    align?,
    children?
    classNames?
    style?
}

function Steps({
    delay = 0,
    route = 'topArc',
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {    
  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.6 }}
    >
    <Container>
        <Columns>
            <Column>
                <Step step={1}>
                    Take out a new Auto, Personal, or Recreational Loan or refinance an auto loan from a different lender by September 30, 2024.
                </Step>                
            </Column>
            <Column>
                <Step step={2} route={'bottomArc'}>
                    As long as your new loan is funded by October 31, you’ll automatically be entered to win $1,000. [super]
                </Step>
            </Column>
            <Column>
                <Step step={3} lastStep>
                    We will announce the lucky winner in November 2024!
                </Step>
            </Column>
        </Columns>
    </Container>
    </motion.div>
  );
}

export default Steps;
