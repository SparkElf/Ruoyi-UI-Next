import axios from 'axios'
import { ElLoading, ElMessage, type LoadingParentElement } from 'element-plus'
import { saveAs, type FileSaverOptions } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode  from '@/utils/errorCode'
import { blobValidate } from '@/utils/ruoyi'
import type { ComponentOptionsBase } from 'vue'

const baseURL = import.meta.env.VITE_APP_BASE_API
let downloadLoadingInstance: { close: any; setText?: (text: string) => void; removeElLoadingChild?: () => void; handleAfterLeave?: () => void; vm?: globalThis.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>; $el?: HTMLElement; originalPosition?: globalThis.Ref<string>; originalOverflow?: globalThis.Ref<string>; visible?: globalThis.Ref<boolean>; parent?: globalThis.Ref<LoadingParentElement>; background?: globalThis.Ref<string>; svg?: globalThis.Ref<string>; svgViewBox?: globalThis.Ref<string>; spinner?: globalThis.Ref<string | boolean>; text?: globalThis.Ref<string>; fullscreen?: globalThis.Ref<boolean>; lock?: globalThis.Ref<boolean>; customClass?: globalThis.Ref<string>; target?: globalThis.Ref<HTMLElement>; beforeClose?: globalThis.Ref<(() => boolean) | undefined> | undefined; closed?: globalThis.Ref<(() => void) | undefined> | undefined };

export default {
  name(name: string | number | boolean, isDelete = true) {
    var url = baseURL + "/common/download?fileName=" + encodeURIComponent(name) + "&delete=" + isDelete
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURIComponent(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  resource(resource: string | number | boolean) {
    var url = baseURL + "/common/download/resource?resource=" + encodeURIComponent(resource);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURIComponent(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  zip(url: any, name: any) {
    var url = baseURL + url
    downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      } else {
        this.printErrMsg(res.data);
      }
      downloadLoadingInstance.close();
    }).catch((r) => {
      console.error(r)
      ElMessage.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close();
    })
  },
  saveAs(text: string | Blob, name: string | undefined, opts?: FileSaverOptions) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data: { text: () => any }) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code as keyof typeof errorCode] || rspObj.msg || errorCode['default']
    ElMessage.error(errMsg);
  }
}

