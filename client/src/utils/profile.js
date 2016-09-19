export function isProfileComplete(profile) {
    let properties = [
      'first_name', 'last_name', 'personal_description', 'level'
    ]
    return properties.every((o)=> typeof profile[o] !== 'undefined' && profile[o] !== '')
}
