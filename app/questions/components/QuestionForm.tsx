import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function QuestionForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="text" label="Text" placeholder="Text" />

      <LabeledTextField name="choice1" label="Choice 1" placeholder="Choice 1" />
      <LabeledTextField name="choice2" label="Choice 2" placeholder="Choice 2" />
      <LabeledTextField name="choice3" label="Choice 3" placeholder="Choice 3" />
    </Form>
  )
}
