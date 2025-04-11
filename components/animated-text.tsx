import { motion } from "framer-motion";

const AnimatedText = ({ text, className, handwriting, children }: { 
  text: string; 
  className?: string; 
  handwriting?: boolean; 
  children?: React.ReactNode; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`inline-block ${className}`}
    >
      {handwriting ? (
        <span className="handwriting">{text}</span>
      ) : (
        <span>{text}</span>
      )}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

export default AnimatedText;