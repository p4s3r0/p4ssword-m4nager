import { Dexie } from "dexie";

const db = new Dexie("p4ssword_m4nager");
db.version(9).stores({
  log: "++idx, u, p, e, a",
  settings: "idx, fold_pass_select",
  virgin: "idx, virgin",
});

export async function DBL_onboardingOff() {
  const onboarding = await db.virgin.toArray();
  if (onboarding.length === 1) return true;

  await db.virgin.add({ idx: 0, virgin: "im not a virgin" });
}

export async function DBL_onboardingOn() {
  await db.virgin.clear();
}

export async function DBL_getOnboarding() {
  const onboarding = await db.virgin.toArray();
  return onboarding.length === 0;
}

export async function settings_getFolderOrPassword() {
  const settings = await db.settings.toArray();
  if (settings.length === 0) {
    return "Folders";
  }
  return settings[0].fold_pass_select;
}

export async function settings_updateFolderOrPassword(value) {
  let settings = await db.settings.toArray();
  if (settings.length === 0) {
    settings = {
      idx: 0,
      fold_pass_select: value,
    };
    await db.settings.add(settings);
    return;
  }
  await db.settings.update(0, { fold_pass_select: value });
}