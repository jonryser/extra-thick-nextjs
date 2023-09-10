import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { AdminWelcome } from 'common/WelcomeContent'

export const Home = () => {
	const { t } = useText('home')

	return (
		<PageWrapper title={t('title')} withSpace={false}>
			{/* Client about info */}
			<AdminWelcome className='mb-12' />

			{/* Divider */}
			<div className='border-b col-span-1 col-span-3 border-color-black-400 my-9' />
		</PageWrapper>
	)
}
