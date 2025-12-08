const state = reactive({
  user: {
    name: 'Marty McFly',
    company: 'Time Travel Inc.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj-6M7j70bXsja8XHuBxcTPIWp4kDQANDLx-vSFoIdA8fQa-FWfeiAR2Q641BeZUUZDNrXBUS3dE3JsN7AaT9rWH56gj3h4_vmCUaJWMLIK69oJsqKHjrU-EeKR-304eB0QDNg2M5wxU1sA4Hwb4i7uNBUpyHk_KCw4j9481bN9esSvvxU1iqcvJL-mBh_4wiHVQY96lB0SLg71RD4WKZiTCn8sKXKWYt6orVbnjqY5lb-o2Fs9OCqk7HjNacBsHZB8sydxv9dF1Q'
  },
  speed: 87,
  gigawatts: 1.02,
  destinationTime: { date: 'OCT 26 2024', time: '10:04 PM' },
  currentTime: { date: 'OCT 26 1985', time: '01:21 AM' },
  lastDeparture: { date: 'NOV 05 1955', time: '06:00 AM' },
  alerts: [
    { type: 'success' as const, message: 'SUCCESS: Timeline Y secured', time: '2 hours ago', icon: 'check_circle' },
    { type: 'warning' as const, message: 'ALERT: Paradox approaching', time: '8 hours ago', icon: 'warning' },
    { type: 'error' as const, message: 'CRITICAL: Plutonium levels low', time: '1 day ago', icon: 'error' }
  ],
  projects: [
    { id: 1, name: 'Project Alpha', description: 'Secure the timeline by 2024.', target: 'Oct 26, 2024', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa4Fbv99PrnDEbTJKkhWGJbhdlvFN3au1A0tIa0izyRdpQVpArdQwXU1jPwYRseTVox-4EatdIGbK0ZEzIeBOSfbftegoRIFuI536D9Nm71W-VgG5W6JNqhKer1hq6HGk_hpLqqUah_htxaaD4b40hsMvzpigIa8p-j4-p5eHM2-dODeELyfMjiO6KryZIDGnOrM2UviFSg45pgGDi0JVv9zIYN0KNa9C9ayW3mOZcbHY2gkKNPMwWn0L8MJDXnclLwZLpyTyo0E4' },
    { id: 2, name: 'Project Beta', description: 'Observe dinosaur extinction event.', target: 'Nov 05, 2024', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOZlPPiV9T7UtIW1UiMYAquvBXdPa2EgaZHA1-2lh8AxPe6SpNpupd_rZ_tjLdnBy3QtGawE93ho4V9tJyjqED7uZPW6-d-NsE3aXxqr2XGnd3RV2piBkmAOJQ1nQqB9gfMLMhNFSIggXfaY_ueBocT5I3TFVym-wZT_MfvEqb48YoLNKg1YKmiNXSpyoQZCJZxBF_mKdIo4_lRh9blrHdB7v0oyli9XFMrWpgtSlT3rEnsviSsWeheb9gcuM1qGENxFjd_4dLEsA' }
  ]
})

export const useAppState = () => {
  const gigawattsPercentage = computed(() => (state.gigawatts / 1.21) * 100)

  const startTrip = () => {
    state.speed = 88
    state.gigawatts = 1.21
  }

  return {
    ...toRefs(state),
    gigawattsPercentage,
    startTrip
  }
}
