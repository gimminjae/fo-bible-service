<template>
  <div>
      <div class="navbar bg-base-100 flex justify-around sticky top-0">
          <h1>새로운 성경읽기표</h1>
      </div>
      <div class="mx-auto card w-96 bg-neutral text-neutral-content">
          <div class="card-body items-center text-center">
              <div class="form-control">
                  <label class="label">
                      <span class="label-text">시작</span>
                  </label>
                  <label class="">
                      <input type="text" placeholder="" class="input input-bordered"/>
                  </label>
                  <label class="label">
                      <span class="label-text">종료</span>
                  </label>
                  <label class="">
                      <input type="text" placeholder="" class="input input-bordered"/>
                  </label>
              </div>
              <div class="form-control">
                  <div>
                      <label class="label">
                          <span class="label-text">구약</span>
                      </label>
                      <label class="">
                          <input id="oldCount" type="range" min="1" max="5" value="1" class="range" step="1"/>
                          <div class="w-full flex justify-between text-xs px-2">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                          </div>
                      </label>

                  </div>
                  <div>
                      <label class="label">
                          <span class="label-text">신약</span>
                      </label>
                      <label class="">
                          <input id="newCount" type="range" min="1" max="5" value="1" class="range" step="1"/>
                          <div class="w-full flex justify-between text-xs px-2">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                          </div>
                      </label>
                  </div>
              </div>
              <div class="card-actions justify-end">
                  <button class="btn btn-primary">만들기</button>
                  <button class="btn btn-ghost">취소</button>
              </div>
          </div>
      </div>
      <div class="justify-center">
      </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

</script>