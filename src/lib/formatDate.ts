import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

export function formatDate(date: string): string {
  const formattedDate = dayjs(date).format('DD/MM hh:mm A')

  return formattedDate
}
