import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { inputs } from '@/pages/authentication/signup/utili/inputs'
import GenericFormInputs from '@/shared/GenericFormInputs'
import { useSubmitForm } from '../hooks/orders/useSubmitForm'


const Orders = () => {
  const { onSubmit, form, handleChange, imageSrc } = useSubmitForm();
  return (
    <div>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 mb-10 text-gray-500 overflow-y-auto w-96 ">
          {inputs.map((elem, i) => (
            <GenericFormInputs key={i + elem.name} form={form} {...elem} />
          ))}
          <div>
            <div className="flex">
              <input onChange={handleChange} type="file"  />
              <img
                className="w-[50px] h-[50px] rounded-full shadow object-cover"
                src={imageSrc}
                alt=""
              />
            </div>
          </div>

          <Button className=" bg-red-400" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Orders

