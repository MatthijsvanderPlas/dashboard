import {
  SiTypescript,
  SiRedux,
  SiReact,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiTailwindcss,
} from 'react-icons/si';
import { FaChartBar } from 'react-icons/fa';
import Section from '~/components/Section';

function About() {
  return (
    <>
      <div className='flex relative p-4 pt-0 flex-col mx-auto  mb-14  lg:w-4/5  max-w-[75ch]  leading-relaxed'>
        <h1 className='text-2xl p-4 my-4 tracking-tighter'>About</h1>
        <p className='text-base tracking-wide'>
          Short description about the App/Site I have created as my final assignment for my WINC
          Academy course, Front-End Developer.
        </p>
        <div className='grid-flow-col grid grid-rows-2 auto-cols-fr lg:flex gap-5 lg:justify-around mt-10 mb-2 '>
          <SiHtml5 className='text-6xl text-[#e44b21] inline-block' />
          <SiCss3 className='text-6xl text-[#304cdc] ' />
          <SiJavascript className='text-6xl text-[#e8d44d]' />
          <SiTypescript className='text-6xl text-[#2f74c0]' />
          <SiReact className='text-6xl text-[#5dd3f3]' />
          <SiRedux className='text-6xl text-[#7248b6]' />
          <SiTailwindcss className='text-6xl text-[#36b7f0]' />
          <FaChartBar className='text-6xl text-[#f7575c]' />
        </div>
        <Section title='Redux'>
          Not the first time working with Redux, but this time I explored and learned about Thunk
          and Middleware. What I struggled with for a while was the idea that the original data is
          not being edited or changed. All data on the site is derived by selectors as is
          recommended practice, only the student filter is actually state that is manipulated
          through actions. In the end I decided to try and work with a normalized data approach.
        </Section>
        <Section title='Tailwind Css'>
          First time working with Tailwind css, but definitely a keeper. I will likely evolve in the
          way I implement tailwind into my react apps and break up components even more. In general
          I like and enjoy working with the library and the amount of freedom and ease of
          customization it gives without having to resort to separate css files.
        </Section>
        <Section title='Typescript'>
          I used this project to start learning Typescript, it was at times a steep learning curve
          and frustrating. It was quite challenging to learn as simultaneously learning other
          techniques. The developer experience and confidence it gives while developing is amazing
          and I will continue to learn and expand with Typescript.
        </Section>
        <Section title='visX'>
          There are many great charting libraries out there but most lacked the customization I
          wanted to have. VisX to me implements the underlying d3 library in the best way.
          Simplifying much of the implementation and yet remains close and true to d3, knowing how
          to work with d3 makes working in visX a breeze.
        </Section>
      </div>
    </>
  );
}

export default About;
