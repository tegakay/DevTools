import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toolsData, categories } from '../utils/toolsData';

const Tools = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Developer Tools
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browse our collection of developer utility tools
        </motion.p>
      </motion.div>

      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {category}
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {toolsData
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <motion.div key={tool.path} variants={itemVariants}>
                  <Link
                    to={tool.path}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow hover:border-blue-500 dark:border-gray-700 border-2 border-transparent h-full block"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tool.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Tools;
