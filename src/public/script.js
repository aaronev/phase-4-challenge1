console.log('hello from the browser JavaScript')

function confirmDelete(reviewID) {
  if (confirm('Are you sure you want to delete this review?')) {
    fetch('/reviews/' + reviewID, {
      method: 'DELETE',
      credentials: 'include'
    }).then(() => { return location.reload()})
  }
}