
import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About OpenCrochet | A Crochet Pattern Directory</title>
        <meta name="description" content="OpenCrochet is a community-driven directory of crochet patterns and tutorials. Learn more about our mission to make crocheting accessible to everyone." />
      </Helmet>
      
      <div className="container max-w-4xl py-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About OpenCrochet</h1>
          <p className="text-xl text-muted-foreground">
            A community-driven directory of crochet patterns and tutorials
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            OpenCrochet was created with a simple mission: to make the art of crocheting accessible to everyone, 
            from beginners picking up a hook for the first time to experienced crafters looking for new challenges.
          </p>
          
          <p>
            Our platform provides a curated collection of high-quality crochet patterns and tutorials that span various 
            difficulty levels, styles, and project types. We believe that creativity should be shared freely, which is why 
            all patterns on OpenCrochet are available at no cost.
          </p>
          
          <h2>Our Values</h2>
          
          <ul>
            <li>
              <strong>Accessibility:</strong> We strive to make crocheting accessible to everyone, regardless of skill level or background.
            </li>
            <li>
              <strong>Community:</strong> We believe in the power of community and sharing knowledge.
            </li>
            <li>
              <strong>Quality:</strong> All patterns on OpenCrochet are carefully tested and reviewed for clarity and accuracy.
            </li>
            <li>
              <strong>Sustainability:</strong> We promote eco-friendly practices and materials whenever possible.
            </li>
          </ul>
          
          <h2>Join Our Community</h2>
          
          <p>
            OpenCrochet is more than just a pattern directory—it's a community of crafters passionate about creating 
            beautiful things with yarn and a hook. We invite you to browse our patterns, try them out, and share your 
            creations with us.
          </p>
          
          <p>
            Whether you're crocheting your first granny square or designing intricate amigurumi, we're here to support 
            your creative journey.
          </p>
          
          <p>
            Happy crocheting!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
