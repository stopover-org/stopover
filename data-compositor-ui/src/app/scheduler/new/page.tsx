import { memo } from "react";
import { useForm } from "react-hook-form";
import NewSchedulingForm from "@/forms/NewSchedulingForm";

const Page = () => (
  <div className="mx-auto flex col-auto max-w-5xl items-center justify-center p-6 lg:px-8">
    <NewSchedulingForm />
  </div>
);

export default memo(Page);
