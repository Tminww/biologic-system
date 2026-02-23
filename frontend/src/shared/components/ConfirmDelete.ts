import { useI18n } from '@/shared/i18n/i18n'
import { useConfirm } from 'primevue/useconfirm'

export const useConfirmDelete = () => {
  const confirm = useConfirm()
  const { t } = useI18n()
  return (message: string, onAccept: () => void) => {
    confirm.require({
      
      message,
      header: t('confirm.title'),
      icon: 'pi pi-exclamation-circle',
      acceptLabel: t('confirm.delete'),
      rejectLabel: t('confirm.cancel'),
      acceptClass: 'p-button-danger',
      rejectClass: 'p-button-secondary',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      accept: onAccept
    })
  }
}
