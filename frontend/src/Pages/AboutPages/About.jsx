import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpenCheck,
  Brain,
  Lightbulb,
  Users,
} from "lucide-react";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <div className="px-2 py-5">
      <TittleAnimation tittle="About" subtittle="About Us More Information" />
     

      <motion.h1
        className="text-3xl lg:text-4xl font-bold mb-8 text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Mathematics — The Journey of Precision, Curiosity, and Confidence
      </motion.h1>

      <motion.p
        className="mb-6 text-lg leading-relaxed text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        Mathematics has always been more than just numbers. It’s the silent
        language that shapes the universe — from the spiral of a galaxy to the
        rhythm of our heartbeat. With this belief at its core, our journey began
        — not with crowds, but with a small group of curious minds, and a dream:{" "}
        <strong className="text-blue-600">
          to make mathematics open, accessible, and empowering for every student
        </strong>
        .
      </motion.p>

      <motion.p
        className="mb-6 text-lg text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        In the beginning, we focused on breaking the barriers that often make
        math feel overwhelming — confusion, fear, and lack of proper guidance.
        The response was phenomenal. It proved that when taught with clarity,
        care, and creativity, math can become not just understandable, but
        exciting.
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold mb-4 flex items-center gap-2"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <Users className="text-green-600" />
        What We Offer
      </motion.h2>

      <motion.ul className="space-y-4 mb-8" initial="hidden" animate="visible">
        {[
          {
            icon: <Brain className="text-purple-600 mt-1" />,
            text: (
              <>
                <strong>Experienced mentors</strong> who bring both knowledge
                and passion.
              </>
            ),
          },
          {
            icon: <BookOpenCheck className="text-indigo-600 mt-1" />,
            text: (
              <>
                <strong>Curriculum-aligned teaching</strong> tailored to meet
                modern standards.
              </>
            ),
          },
          {
            icon: <Lightbulb className="text-yellow-500 mt-1" />,
            text: (
              <>
                <strong>Creative problem-solving strategies</strong> for
                real-world challenges.
              </>
            ),
          },
          {
            icon: <BarChart3 className="text-cyan-600 mt-1" />,
            text: (
              <>
                <strong>Smart assessment systems</strong> that value true
                understanding over memorization.
              </>
            ),
          },
        ].map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3 text-justify"
            custom={5 + index}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {item.icon}
            <span>{item.text}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="mb-6 text-lg text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={9}
      >
        But above all,{" "}
        <strong className="text-emerald-700">
          students remain at the center of our mission
        </strong>
        . Every question they ask, every fear they overcome, and every concept
        they finally understand — these moments are the heartbeat of our vision.
      </motion.p>

      <motion.p
        className="mb-6 text-lg text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={10}
      >
        Thousands of learners have already discovered the joy of learning
        mathematics with us — completely free. We’re not just teaching formulas;
        we’re building{" "}
        <strong>confidence, logic, and a lifelong love for learning</strong>.
      </motion.p>

      <motion.p
        className="text-xl font-semibold text-blue-700 mt-10 text-justify"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={11}
      >
        ✨ Join us in this journey. Let mathematics unlock the genius within
        you.
      </motion.p>
    </div>
  );
};

export default About;
