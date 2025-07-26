import type { TableColumn } from '@vtex/admin-ui'
import {
  experimental_I18nProvider as I18nProvider,
  IconTrash,
  IconPencil,
  Skeleton,
  Table,
  useTableState,
  useDataViewState,
  DataView
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-apollo'
import { messages } from '../../../utils/messages'
import  Trash  from '../DeleteButton/TrashButton'
import GET_COOKIE from '../../../graphql/getCookie.graphql'
import Pencil from '../EditButton/PencilButton'

type Field = { id: string; CookieFortune: string };
type CookieData = { id: string; CookieFortune: string };
type InputType = { getCookieData: Field[][]; };
type TableCol = { id: string;  CookieFortune: string }

const runCookieData =(input: InputType): CookieData[]=> {
  return input.getCookieData.map((fields) => {
    const result: Partial<CookieData> = {};
    if (Array.isArray(fields)) {
      fields.forEach((field) => {
        if (field?.id === 'id') result.id = field.CookieFortune;
        if (field?.id === 'CookieFortune') result.CookieFortune = field.CookieFortune;
      });
    } else if (fields && typeof fields === 'object') {
      result.id = (fields as any).id;
      result.CookieFortune = (fields as any).CookieFortune;
    }
    return result as CookieData;
  });
}
const CookieTableItemData = () => {
  const intl = useIntl()
  const {  culture: { locale } } = useRuntime()
  const view = useDataViewState()

  const { data: myData, loading } = useQuery(GET_COOKIE, {
    onCompleted: (resultData) => {
      if (resultData?.getCookieData?.length > 0) {
        view.setStatus({
          type: 'ready',
        })
      } else {
        view.setStatus({
          type: 'empty',
          message: intl.formatMessage(messages.tableNoResults),
        })
      }
    },
    onError: () => {
      view.setStatus({
        type: 'error',
        message: intl.formatMessage(messages.tableDataError),
      })
    },
  })

  const columns: Array<TableColumn<TableCol>> = [
    {
      id: 'id',
      width: "25%",
      header: intl.formatMessage(
        messages.cookieFortuneTableidColumnLabel
      ),
    },
    {
      id: 'CookieFortune',
      header: intl.formatMessage(messages.cookieFortuneTableNameColumnLabel),
    },
    {
      id: 'edit',
      header: () => <IconPencil />,
      width: 80,
      resolver: {
        type: 'root',
        render: function RowRender({ item, context }: any) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }
          return (
            <I18nProvider locale={locale}>
              <Pencil item={item} />
            </I18nProvider>
          )
        },
      }
    },
    {
      id: 'delete',
      header: () => <IconTrash />,
      width: 80,
      resolver: {
        type: 'root',
        render: function RowRender({ item, context }: any) {
          if (context.status === 'loading') {
            return <Skeleton csx={{ height: 24 }} />
          }
          return (
            <I18nProvider locale={locale}>
              <Trash item={item} />
            </I18nProvider>
          )
        },
      }
    },
  ]

  const gridSModule = useTableState<TableCol>({
    columns,
    length: 15,
    items: myData ? runCookieData(myData) : [],
    view,
  })

    useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({ type: 'loading' })
    }
  }, [loading, view])

  return (
    <I18nProvider locale={locale}>
      <DataView state={view}>
        <Table  state={gridSModule} />
      </DataView>
    </I18nProvider>
  )
}

export default CookieTableItemData
