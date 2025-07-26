import React, { useEffect, useState } from 'react'
import {
  Button,
  useModalState,
  ModalHeader,
  ModalContent,
  Modal
} from '@vtex/admin-ui'
import { messages } from '../../../utils/messages'
import { useIntl } from 'react-intl'
import CREATE_COOKIE from './../../../graphql/createCookie.graphql'
import GET_COOKIE from '../../../graphql/getCookie.graphql'
import { useMutation } from 'react-apollo'
import { Form, useFormState, TextArea } from '@vtex/admin-ui-form'

const AddNewCookieFortune = () => {

  const intl = useIntl()
  const modal = useModalState()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  const [
    createCookieFortune,
    { data: allDataCompleted, loading: mutationLoading },
  ] = useMutation(CREATE_COOKIE, {
    refetchQueries: [{ query: GET_COOKIE }],
    awaitRefetchQueries: true,
  })

  const form = useFormState()

  useEffect(() => {
    if (allDataCompleted) {
      setLoading(false)
      modal.hide()
      form.reset()
    }
  }, [allDataCompleted])


  const handleSubmit = (data: any) => {
    if (data?.Input) {
      createCookieFortune({
        variables: {
          CookieFortune: String(data?.Input)
        }
      })
      setAlert(false)
    } else {
      setAlert(true)
    }
  }

  return (
    <div>
      <Button onClick={modal.toggle} variant="secondary">
        {intl.formatMessage(messages.addCookieFortuneTitle)}
      </Button>
      <Modal aria-label={intl.formatMessage(messages.cookieFortuneTableModalLabel)} state={modal}>
        <ModalHeader>
          <div className='mr-auto' style={{
            minWidth: "50vw",
            display: "flex",
            justifyContent: "space-between",
          }}>
            {intl.formatMessage(messages.cookieFortuneTableModalLabel)}
            {alert && (
              <div style={{color: "red"}}>{intl.formatMessage(messages.cookieFortuneTableModalAlert)}</div>
            )
            }
          </div>
        </ModalHeader>
        <ModalContent>
          <Form state={form} onSubmit={handleSubmit}>
            <div>
              <TextArea
                name="Input"
                state={form}
                maxLength={120}
              />
              <Button size="normal" variant="secondary" loading={mutationLoading || loading} type="submit">
                {intl.formatMessage(messages.addCookieFortuneTitle)}
              </Button>
            </div>
          </Form>
        </ModalContent>
      </Modal>

    </div>
  )
}
export default AddNewCookieFortune