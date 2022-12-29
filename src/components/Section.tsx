function Section({ title, children }: { title: string; children: string }) {
  return (
    <>
      <h2 className='text-xl p-4 my-4 tracking-tighter'>{title}</h2>
      <p className='text-base tracking-wide'>{children}</p>
    </>
  );
}

export default Section;
