import React, {useState} from 'react'
import {
  IconTrash,
  Button,
  useModalState,
  ModalHeader,
  ModalContent,
  Modal,
  ModalFooter,
  ModalButton
} from '@vtex/admin-ui'
import { messages } from '../../../utils/messages'
import { useIntl } from 'react-intl'
import DELETE_COOKIE from '../../../graphql/deleteCookie.graphql'
import GET_COOKIE from '../../../graphql/getCookie.graphql'
import { useMutation } from 'react-apollo'

 const Trash = ({ item}:any) => {
  
  const intl = useIntl()
  const modal = useModalState()
  const [loading, setLoading] = useState(false)

 const [deleteCookie, { loading: deleteLoading }] = useMutation(DELETE_COOKIE, {
    refetchQueries: [{ query: GET_COOKIE }],
    awaitRefetchQueries: true,
  })

   const handleDelete = async () => {
    try {        
      await deleteCookie({ variables: { id: item.id } })
      setLoading(false)
      modal.hide()
    } catch (error) {
      console.error('Error deleting cookie:', error)
    }
  }

  return (
    <div>
      <Button onClick={modal.toggle} variant="criticalTertiary">
        <IconTrash />
      </Button>

      <Modal aria-label={item?.CookieFortune} state={modal}>
        <ModalHeader>
          <div className="mr-auto" style={{
            minWidth: "30vw"
          }}>
            {intl.formatMessage(messages.cookieFortuneTableModalLabel)}
          </div>
        </ModalHeader>

        <ModalContent>
          {item?.CookieFortune}
        </ModalContent>

        <ModalFooter>
          <ModalButton variant="secondary" closeModalOnClick>
            {intl.formatMessage(messages.cancelLabel)}
          </ModalButton>

          <Button
            variant="critical"
            loading={deleteLoading || loading}
            onClick={handleDelete}
          >
            {intl.formatMessage(messages.cookieFortuneOrdersTableDeleteButton)}
            <IconTrash />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Trash