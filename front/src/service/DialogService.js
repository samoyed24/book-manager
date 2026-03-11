import { h, render } from 'vue';
import DialogContainer from '@/components/Base/DialogContainer.vue';
export function createDialog(component, dialogProps, divProps) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    let dialogInstance = null;
    const vm = h(DialogContainer, {
        onClose: () => {
            render(null, container);
            container.remove();
        },
    });
    render(vm, container);
    if (vm.component?.exposed) {
        vm.component.exposed.openDialog(component, dialogProps, divProps);
        dialogInstance = vm.component.exposed;
    }
    return {
        dialogInstance,
        container,
        divProps
    };
}
