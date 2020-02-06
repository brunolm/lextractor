;(async function() {
  const valueOrDefault = (fn, def) => {
    try {
      return fn()
    } catch (err) {
      return def || ''
    }
  }

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  async function openDeferedSections() {
    const deferredElements = document.querySelectorAll('.pv-deferred-area')

    for (const el of deferredElements) {
      el.scrollIntoView()

      await wait(200)
    }
    await wait(2000)
    window.scrollTo(0, 0)
  }

  const link = window.location.href

  await openDeferedSections()

  const skillsButton = document.querySelector('.pv-profile-section__card-action-bar')
  skillsButton.click()

  const contactInfoLink = document.querySelector('[data-control-name="contact_see_more"]')
  contactInfoLink.click()
  await wait(1000)

  const skills = []

  const skillElementList = document.querySelectorAll('.pv-skill-category-entity__name-text')
  if (skillElementList) {
    for (const skillElement of skillElementList) {
      const skillName = skillElement.innerText
      const skillEndorsements = +skillElement.closest('div').lastElementChild.lastElementChild.innerText

      skills.push({ name: skillName, endorsements: skillEndorsements })
    }
  }

  const data = {
    name: valueOrDefault(() => document.title.split('|')[0].replace(/ $/, '')),
    position: valueOrDefault(() => document.querySelector('.pv-top-card h2').innerText),
    location: valueOrDefault(() => document.querySelector('.pv-top-card--list:nth-child(3) li.t-normal').innerText),
    email: valueOrDefault(() => document.querySelector('[href^="mailto:"]').innerText),
    link,
    skills,
  }

  chrome.runtime.sendMessage({
    action: 'done',
    data: JSON.stringify(data),
  })
})()
