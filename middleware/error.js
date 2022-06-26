export default function handleNotFound(request, response) {
  response.status(404).render('error', { messege: 'the requested endpoint is not found' });
}
