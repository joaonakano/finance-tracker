import { ipcMain } from "electron";
import { IPC_CHANNELS } from "@shared/ipc";

import { CategoryRepository } from "../repositories/category.repository";
import { BulkDeleteCategoriesInput, CreateCategoryInput, DeleteCategoryInput, GetCategoryInput, UpdateCategoryInput } from "@shared/types";

export function registerCategoryHandlers() {
    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_GET_ALL,
        async (_, user_id: string) => {
            try {
                const categories = CategoryRepository.getAll(user_id)

                return JSON.parse(JSON.stringify(categories))
            } catch (err) {
                console.error('[IPC] categories:get_all error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_GET_BY_ID,
        async (_, data: GetCategoryInput) => {
            try {
                const category = CategoryRepository.getById(data)

                return category ? JSON.parse(JSON.stringify(category)) : undefined
            } catch (err) {
                console.error('[IPC] categories:get_by_id error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_CREATE,
        async (_, data: CreateCategoryInput) => {
            try {
                const category = CategoryRepository.create(data)

                return JSON.parse(JSON.stringify(category))
            } catch (err) {
                console.error('[IPC] categories:create error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_UPDATE,
        async (_, data: UpdateCategoryInput) => {
            try {
                const category = CategoryRepository.update(data)

                return category ? JSON.parse(JSON.stringify(category)) : undefined
            } catch (err) {
                console.error('[IPC] categories:update error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_DELETE,
        async (_, data: DeleteCategoryInput) => {
            try {
                return CategoryRepository.delete(data)
            } catch (err) {
                console.error('[IPC] categories:delete error:', err)
                return false
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.CATEGORIES_BULK_DELETE,
        async (_, data: BulkDeleteCategoriesInput) => {
            try {
                return CategoryRepository.bulkDelete(data)
            } catch (err) {
                console.error('[IPC] categories:bulk_delete error:', err)
                return 0
            }
        }
    )
}
