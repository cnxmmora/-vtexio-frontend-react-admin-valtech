import {
  ThemeProvider,
  Page,
  PageContent,
  PageHeader,
  PageHeaderTop,
  PageHeaderTitle,
  PageHeaderActions,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import CookieFortuneManagementTable from './CookiesTableBody/CookieTableInput'
import { messages } from '../../utils/messages'

import AddNewCookieFortune from './CookieAdminComponent/AddNewCookieFortune'

const CookieAdminApp: FC = () => {
  const intl = useIntl()

  return (
    <ThemeProvider>
      <Page>
        <PageHeader>
          <PageHeaderTop>
            <PageHeaderTitle>
              {intl.formatMessage(messages.marioPageHeaderTitle)}
            </PageHeaderTitle>
            <PageHeaderActions>
              <AddNewCookieFortune />
            </PageHeaderActions>
          </PageHeaderTop>
        </PageHeader>
        <PageContent layout="wide">
            <CookieFortuneManagementTable />
        </PageContent>
      </Page>
    </ThemeProvider>
  )
}

export default CookieAdminApp
