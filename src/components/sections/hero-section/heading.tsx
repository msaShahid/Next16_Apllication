"use client"
import { TypeAnimation } from 'react-type-animation';

type PropsType = {
  text: string;
};

export function Heading({ text }: PropsType) {
  return (
    <h1 className="text-gray-700 mx-auto font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px] max-w-[700px]">
      {text}
      <br />

      <span className="text-primary-500 dark:text-indigo-400">
        <TypeAnimation
          sequence={[
            'Text Generator',
            1000,
            'Code Generator',
            1000,
            'Image Generator',
            1000,
            'Video Generator',
            1000,
          ]}
          speed={50}
          repeat={Infinity}
          cursor
        />
      </span>
    </h1>
  );
}
