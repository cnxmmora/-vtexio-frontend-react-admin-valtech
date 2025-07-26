import React, { useState } from 'react'
import {
  Button,
  useModalState,
  ModalHeader,
  Modal,
  ModalFooter,
  ModalButton,
  IconPencil
} from '@vtex/admin-ui'
import { messages } from '../../../utils/messages'
import { useIntl } from 'react-intl'
import UPDATE_COOKIE from '../../../graphql/updateCookie.graphql'
import GET_COOKIE from '../../../graphql/getCookie.graphql'
import { useMutation } from 'react-apollo'
import { Form, useFormState, TextArea } from '@vtex/admin-ui-form'

const Pencil = ({ item }: any) => {
  const intl = useIntl();
  const modal = useModalState();
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const form = useFormState({
    defaultValues: { CookieFortune: item?.CookieFortune }
  })


  const [updateCookie, { loading: updateLoading }] = useMutation(UPDATE_COOKIE, {
    refetchQueries: [{ query: GET_COOKIE }],
    awaitRefetchQueries: true,
  })

  const handleSubmit = async (data: any) => {
    console.log(data,"las_datas");
    
    if( data.CookieFortune){
    try {
      await updateCookie({ variables: { id: item.id, CookieFortune: data.CookieFortune } })
      setLoading(false)
      form.reset()
      modal.hide()
    } catch (error) {
      console.error('Error editing cookie:', error)
    }
    setAlert(false)
  }else{
    setAlert(true)
  }
  }

  return (
    <div>
      <Button onClick={modal.toggle} variant="tertiary">
        <IconPencil />
      </Button>

      <Modal aria-label={item?.CookieFortune} state={modal}>
        <ModalHeader>
          <div className="mr-auto" style={{
            minWidth: "30vw",
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
        <Form state={form} onSubmit={handleSubmit}>
          <div style={{padding:20}}>
            <TextArea
              name="CookieFortune"
              label="Mensaje"
              maxLength={220}
              state={form}
            />
          </div>
          <ModalFooter>
            <ModalButton variant="primary" closeModalOnClick>
              {intl.formatMessage(messages.cancelLabel)}
            </ModalButton>

            <Button
              variant="primary"
              loading={updateLoading || loading}
              type="submit"
            >
              {intl.formatMessage(messages.cookieFortuneOrdersTableUpdateButton)}
              <IconPencil />
            </Button>
          </ModalFooter>
        </Form>

      </Modal>
    </div>
  )
}

export default Pencil