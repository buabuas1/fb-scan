import { Component, OnInit } from '@angular/core';
import {ModalService} from "@core/services/modal/modal.service";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import {Store} from "@ngrx/store";
import {AppStates} from "../../../state-management/app-state";
import {getFilterState} from "../../../state-management/reducers/filter.reducer";

@Component({
  selector: 'app-fb-comment',
  templateUrl: './fb-comment.component.html',
  styleUrls: ['./fb-comment.component.scss']
})
export class FbCommentComponent implements OnInit {

  constructor(private modalService: ModalService, private store: Store<AppStates>) { }

  ngOnInit() {
  }

    open() {
        this.modalService.openModal({
            title: 'Thu học phí',
            component: CommentFormComponent,
            // isCustomModalHeader: true,
            inputs: [{key: 'studentOrder', value: {}}],
            onSubmit: () => {
            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
        this.store.select(getFilterState)
            .subscribe(rs => console.log(rs));
    }
}
