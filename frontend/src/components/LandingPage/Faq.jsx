import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

export function Faq() {
  return (
    <div className="flex items-center justify-center px-5 sm:px-20">
      <div className="w-full ">
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>Apakah Cocok Untuk pemula ?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-800">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim odio voluptatem porro blanditiis velit officiis provident eaque dolorum debitis, est totam sed voluptatum qui maxime molestias quidem cum a quam.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>Apakah Kelas ini mudah dipahami ?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ipsa adipisci, quos quis odio provident eum aspernatur eveniet cum, eos enim rerum minima ex, facilis quae rem debitis atque quas.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle>Apakah saya harus memiliki latar belakang di bidang IT untuk mengikuti kursus?</AccordionTitle>
            <AccordionContent>
              <p className="mb-2 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, optio quo. Ducimus ab, maiores rerum dolores sapiente debitis in. Cum tempore eveniet fugiat voluptates, placeat voluptas veniam in perspiciatis modi?
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
