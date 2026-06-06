import { DBL_get2Fa, DBL_getFolders, DBL_getPasswords } from "@/dexie";
import { DECRYPT } from "@/store/store";

export async function download() {
  const passwords = await DBL_getPasswords();

  let str = '{\n\t"passwords": [';
  for (let i = 0; i < passwords.length; i++) {
    str += "\n\t\t{\n";
    str = str + '\t\t\t"name": "' + passwords[i].name.replace('"', '"') + '",\n';
    str = str + '\t\t\t"username": "' + (await DECRYPT(passwords[i].username)).replace('"', '"') + '",\n';
    str = str + '\t\t\t"password": "' + (await DECRYPT(passwords[i].password)).replace('"', '"') + '",\n';
    str = str + '\t\t\t"folder": "' + passwords[i].folder.replace('"', '"') + '",\n';
    str = str + '\t\t\t"note": "' + (await DECRYPT(passwords[i].note)).replace('"', '"') + '",\n';
    str = str + '\t\t\t"idx": "' + passwords[i].idx + '",\n';
    str = str + '\t\t\t"starred": "' + passwords[i].starred + '"\n';
    if (i === passwords.length - 1) {
      str += "\t\t}";
    } else {
      str += "\t\t},";
    }
  }

  const folders = await DBL_getFolders(passwords);

  str += '\n\t],\n\t"folders": [';
  for(let i = 0; i < folders.length; i++) {
    str += "\n\t\t{\n";
    str = str + '\t\t\t"folder": "' + folders[i].folder + '",\n';
    str = str + '\t\t\t"color": "' + folders[i].color + '",\n';
    str = str + '\t\t\t"starred": "' + folders[i].starred + '"\n';
    if (i === folders.length - 1) {
      str += "\t\t}";
    } else {
      str += "\t\t},";
    }
  }

  const twoFAs = await DBL_get2Fa();

  str += '\n\t],\n\t"twoFAs": [';
  for(let i = 0; i < twoFAs.length; i++) {
    str += "\n\t\t{\n";
    str = str + '\t\t\t"name": "' + twoFAs[i].name + '",\n';
    str = str + '\t\t\t"secret": "' + twoFAs[i].secret + '"\n';
    if (i === twoFAs.length - 1) {
      str += "\t\t}";
    } else {
      str += "\t\t},";
    }
  }

  str += "\n]}";

  const blob = new Blob([str], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "passwords.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}