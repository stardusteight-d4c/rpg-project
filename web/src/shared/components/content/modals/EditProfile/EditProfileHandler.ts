export class EditProfileHandler {
  private addToast: (
    message: string,
    type?: ToastType,
    position?: number,
    duration?: number
  ) => void
  private update: (data: Partial<IUser>) => Promise<void | IUser>
  private updateSession: (user: IUser) => void
  private replace: (url: string) => void

  constructor(
    addToast: (
      message: string,
      type?: ToastType,
      position?: number,
      duration?: number
    ) => void,
    update: (data: Partial<IUser>) => Promise<void | IUser>,
    updateSession: (user: IUser) => void,
    replace: (url: string) => void
  ) {
    this.addToast = addToast
    this.update = update
    this.updateSession = updateSession
    this.replace = replace
  }

  public getUpdatedData(editableData: any, field: string, value: any): any {
    return { ...editableData, [field]: value }
  }

  public click(elementId: string) {
    const fileInput = document.getElementById(elementId) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  public getUpdatedFileData(
    editableData: any,
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ): any {
    const file = e.target.files?.[0]
    if (!file) return editableData

    const tempUrl = URL.createObjectURL(file)

    const url =
      field === "avatar"
        ? { [`${field}Url`]: tempUrl }
        : { [`${field}Image`]: tempUrl }

    const imageFile =
      field === "avatar"
        ? { [`${field}UrlFile`]: file }
        : {
            [`${field}ImageFile`]: file,
          }

    console.log("log:", {
      ...editableData,
      ...url,
      ...imageFile,
    })

    return {
      ...editableData,
      ...url,
      ...imageFile,
    }
  }

  public getUpdatedRemovedImage(editableData: any, field: string): any {
    const url =
      field === "avatar"
        ? { [`${field}Url`]: undefined }
        : { [`${field}Image`]: undefined }

    const imageFile =
      field === "avatar"
        ? { [`${field}UrlFile`]: undefined }
        : {
            [`${field}ImageFile`]: undefined,
          }

    return {
      ...editableData,
      ...url,
      ...imageFile,
    }
  }

  public async onEdit(
    editableData: any,
    onStatusChange: (value: boolean) => void
  ): Promise<void> {
    const { coverImageFile, avatarUrlFile, ...data } = editableData
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/
    const usernameRegex = /^[a-z0-9]+$/

    if (!nameRegex.test(data.name)) {
      return this.addToast(
        `The name must follow the format "Name Surname"`,
        "error"
      )
    }
    if (!usernameRegex.test(data.username)) {
      return this.addToast(
        "The username must be in lowercase, have at least 4 characters and contain only letters and numbers.",
        "error"
      )
    }

    await this.update(data)
      .then((updatedUser) => {
        onStatusChange(false)
        this.addToast("The profile has been updated!", "success", 45)
        updatedUser && this.updateSession(updatedUser)
        updatedUser && this.replace(`/profile/${updatedUser.username}`)
      })
      .catch((error) => {
        onStatusChange(false)
        this.addToast(error.message, "error")
      })
  }
}
