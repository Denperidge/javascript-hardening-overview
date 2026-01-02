
# JavaScript hardening overview
## Explanation
### ☕️📝 Intro
There's a bunch of security stuff going wrong with JavaScript/npm. There's a bunch of 📦 package managers and even full 🐇 runtimes and they all do different stuff. Lets see which one has the most security potential, and how to configure tools to lessen security risks.

### 📖 Goals, methodology & symbols
The goals of this project are simple-ish:
- Consolidate as much JavaScript security tooling information as possible
- Be easy to contribute to & free to access
- Deliver an easy jumping-off point, through secure & customisable preset configs
- Limit vendor lock-in (focus on tools useable across all git hosts/projects, compared to GitHub apps)

Tl;dr: understandable security to all the people everywhere

I am not an expert in the programs described, so any contributions/corrections are appreciated. The information is sourced as first-hand as I could, through:
- Going over the configuration docs of each tool
- Occasionally checking inside source codes


The symbols used below are used to signify:
🐇: Runtime
📦: Package manager

✅: Enabled by default
🛠️: Easily configurable
⚠️: With caveat
❌: No such option/functionality
❔: Could not find enough info

### Yarn versions: classic & berry only
This is for a simple-ish reason: yarn classic is the corepack default, yarn berry is the most up to date.


### Exemptions: safedep & snyk
While it is not unheard of that JavaScript security experts love using some AI aspects for scanning (Socket, for example, does this too). However, [safedep](https://safedep.io) & [snyk.io](https://snyk.) position themselves as AI-first, which is something I have no interest in.

With that being said: if somebody wants to open a PR info about them, I will merge it.

(If you are aware of the source or energy consumption of their AI, that is a good-to-know addition for people who dislike climate change)
