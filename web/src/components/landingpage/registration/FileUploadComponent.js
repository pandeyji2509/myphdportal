import { Fragment, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import FileUpload from "./FileUpload";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FileUploadComponent = ({ formik }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />} className="bg-white">
        <AccordionHeader onClick={() => handleOpen(1)}>Master's Degree / DMC</AccordionHeader>
        <AccordionBody>
          <FileUpload formik={formik} label="dmc" />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />} className="bg-white">
        <AccordionHeader onClick={() => handleOpen(2)}>
          Eligibility Test (PhD Entrance Test / GATE / UGC-NET)
        </AccordionHeader>
        <AccordionBody>
          <FileUpload formik={formik} label="eligibility" />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className="bg-white">
        <AccordionHeader onClick={() => handleOpen(3)}>
          Migration Certificate (if from other university)
        </AccordionHeader>
        <AccordionBody>
          <FileUpload formik={formik} label="migration" />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />} className="bg-white">
        <AccordionHeader onClick={() => handleOpen(4)}>NOC (If Employed)</AccordionHeader>
        <AccordionBody>
          <FileUpload formik={formik} label="noc" />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />} className="bg-white">
        <AccordionHeader onClick={() => handleOpen(5)}>Scholarship Proof (If Any)</AccordionHeader>
        <AccordionBody>
          <FileUpload formik={formik} label="scholarship" />
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
};

export default FileUploadComponent;