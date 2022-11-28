function mastodon_comments_load(host, toot_id, element) {
  fetch(`https://${host}/api/v1/statuses/${toot_id}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      mastodon_comment_render(data, element)
      fetch(`https://${host}/api/v1/statuses/${toot_id}/context`)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          if (data['descendants'] && Array.isArray(data['descendants']) && data['descendants'].length > 0) {
            data['descendants'].forEach(function (reply) {
              mastodon_comment_render(reply, element)
            })
          }
        })
    })
}

function mastodon_comment_render(toot, element) {
  console.log('Comment:')
  console.log(toot)
  container = document.createElement('a')
  container.href = toot.url
  container.style.textDecoration = 'none'
  comment = document.createElement('div')
  comment.style.lineHeight = 'normal'
  comment.style.background = '#111111'
  comment.style.borderRadius = '10px'
  comment.style.padding = '10px'
  comment.style.marginBottom = '10px'
  comment.style.paddingBottom = '1px'
  comment.append(mastodon_comment_create_author(toot.account))
  comment_content = document.createElement('div')
  comment_content.innerHTML = toot.content
  comment.append(comment_content)
  container.append(comment)
  document.getElementById(element).append(container)
}

function mastodon_comment_create_author(account) {
  author = document.createElement('a')
  author.style.display = 'flex'
  author.style.gap = '10px'
  author.href = account.url
  author_avatar = document.createElement('img')
  author_avatar.src = account.avatar
  author_avatar.width = 46
  author_avatar.height = 46
  author_avatar.style.borderRadius = '5px'
  author.append(author_avatar)
  author_info = document.createElement('span')
  author_display_name = document.createElement('strong')
  author_display_name.style.display = 'block'
  author_display_name.append(document.createTextNode(account.display_name))
  author_info.append(author_display_name)
  author_account = document.createElement('span')
  author_account.append(document.createTextNode(mastodon_acct_full(account)))
  author_info.append(author_account)
  author.append(author_info)
  return author
}

function mastodon_acct_full(account) {
  acct = account.acct
  if (acct.indexOf('@') == -1) {
    account_url = new URL(account.url)
    acct += '@' + account_url.hostname
  }
  return '@' + acct
}
