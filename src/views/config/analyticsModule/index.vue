<template>
<div class="app-container">
    <div class="filter-container"  >
        <el-input size="medium" v-model="listQuery.edgeName" style="height:36px;width:8%" @keyup.enter.native="handleFilter" placeholder="边缘端名称" clearable />
        <el-input size="medium" v-model="listQuery.moduleName" style="height:36px;width:8%" @keyup.enter.native="handleFilter" placeholder="模型名称" clearable />
        <DatePicker style="height:36px;" startVaule="开始日期" endValue="结束日期" @sendTimeData="getTime"></DatePicker>
<!--      <el-date-picker type="daterange" start-placeholder="开始日期" prefix-icon=0
                      end-placeholder="结束日期" range-separator="|" style="font-size: 20px;height:37px" @sendTimeData="getTime"></el-date-picker>-->
        <el-button size="mini" v-waves type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
        </el-button>
        <el-button size="mini" type="primary" style="width: 5%"  v-permission="'analyticsModule:add'" @click="showCreate"> 添加 </el-button>
    </div>

    <el-table :data="list"  v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%;font-size: 18px" :header-cell-style="{background:'#f5f7fa',color:'#409EFF'}">
        <el-table-column align="center" label="序号" min-width="5">
            <template v-slot="scope">
                <span v-text="getIndex(scope.$index)"> </span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="模型名称" min-width="15">
            <template v-slot="scope">
                <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.moduleName }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="检测设备名称" prop="edgeName" min-width="12"></el-table-column>
        <el-table-column align="center" label="模型类型" prop="moduleType" min-width="12"></el-table-column>
        <el-table-column align="center" label="模型说明" prop="description" min-width="18"></el-table-column>
        <el-table-column align="center" label="版本" prop="version" min-width="6"></el-table-column>
      <el-table-column align="center" label="预处理状态" prop="opencv" min-width="6">
        <template slot-scope="scope">
          {{ scope.row.opencv === 0 ? '关闭' : '开启' }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="状态" min-width="7">
            <template v-slot="scope">
                <el-tag v-if="['200','201'].includes(scope.row.status)" type="success" style="width: 100%" disable-transitions>{{statusMap[scope.row.status]}}</el-tag>
                <el-tag v-else-if="['6','7'].includes(scope.row.status)" type="danger" style="width: 100%" disable-transitions>{{statusMap[scope.row.status]}}</el-tag>
                <el-tag v-else-if="scope.row.status === '4' && scope.row.heartbeatCount >5  " style="width: 100%" type="danger" disable-transitions>检测失败</el-tag>
                <el-tag v-else type="info" style="width: 100%" disable-transitions>{{statusMap[scope.row.status]}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="最近修改时间" prop="updateTime" min-width="13"></el-table-column>
        <el-table-column  align="center" label="管理" min-width="18">
            <template  v-slot="scope">

<!--               <template  v-if="['1','2','6','7','9'].includes(scope.row.status)" >
                    <el-button size="mini" :plain='true' type="warning"  @click="showUpdate(scope.$index)" v-permission="'analyticsModule:update'">修改</el-button>
                    <el-button size="mini" :plain='true' type="primary"  @click="showUpload(scope.$index)" v-permission="'analyticsModule:update'">上传</el-button>
                </template>
                <template  v-if="['2','6'].includes(scope.row.status)" >
                    <el-button size="mini" :plain='true' type="primary"  @click="newSyncFile(scope.$index)" v-permission="'analyticsModule:newRelease'">同步</el-button>
                    <el-button size="mini" :plain='true' type="primary"  @click="syncFile(scope.$index)" v-permission="'analyticsModule:release'">同步</el-button>
                </template>
                <template  v-else-if="['3','7','9'].includes(scope.row.status)" >
                    <el-button size="mini" :plain='true' type="primary"  @click="commandModule(scope.$index,'start')" v-permission="'analyticsModule:newRelease'">发布</el-button>
                    <el-button size="mini" :plain='true' type="success" @click="releaseModule(scope.$index)" v-permission="'analyticsModule:release'">发布</el-button>
                </template>
                <template  v-else-if="['200','201'].includes(scope.row.status)" >
                    <el-button size="mini" :plain='true' type="danger" @click="commandModule(scope.$index,'close')" v-permission="'analyticsModule:newRelease'">停止</el-button>
                </template>-->

              <template  v-if="['1','2','6','7','9'].includes(scope.row.status)" >
                <el-button size="mini" :plain='true' type="primary" style="font-size: 18px"  @click="showUpdate(scope.$index)" v-permission="'analyticsModule:update'">修改</el-button>
                <el-button size="mini" :plain='true' type="primary" style="font-size: 18px" @click="showUpload(scope.$index)" v-permission="'analyticsModule:update'">上传</el-button>
              </template>
              <template  v-if="['2','6'].includes(scope.row.status)" >
                <el-button size="mini" :plain='true' type="primary" style="font-size: 18px"  @click="newSyncFile(scope.$index)" v-permission="'analyticsModule:newRelease'">同步</el-button>
<!--                <el-button size="mini" :plain='true' type="text" style="font-size: 15px" @click="syncFile(scope.$index)" v-permission="'analyticsModule:release'">同步</el-button>-->
              </template>
              <template  v-else-if="['3','7','9'].includes(scope.row.status)" >
                <el-button size="mini" :plain='true' type="primary" style="font-size: 18px" @click="commandModule(scope.$index,'start')" v-permission="'analyticsModule:newRelease'">发布</el-button>
<!--                <el-button size="mini" :plain='true' type="text" style="font-size: 15px" @click="releaseModule(scope.$index)" v-permission="'analyticsModule:release'">发布</el-button>-->
              </template>
              <template  v-else-if="['200','201'].includes(scope.row.status)" >
                <el-button size="mini" :plain='true' type="primary" style="font-size: 18px" @click="commandModule(scope.$index,'close')" v-permission="'analyticsModule:newRelease'">停止</el-button>
              </template>

            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-size="listQuery.pageRow" :total="totalCount" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="tempModule" label-position="left" label-width="18%">
            <el-form-item label="设备名称" required>
                <el-select v-model="tempModule.edgeId" placeholder="请选择设备" style="width: 40%">
                    <el-option v-for="item in edgeEnds" :key="item.id" :label="item.edgeName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模型名称" required>
                <el-input type="text" v-model="tempModule.moduleName" style="width: 40%" />
            </el-form-item>
            <el-form-item label="模型类型">
                <el-input type="text" v-model="tempModule.moduleType" style="width: 40%" />
            </el-form-item>
            <el-form-item label="模型说明">
                <el-input type="textarea" autosize v-model="tempModule.description" style="width: 40%">
                </el-input>
            </el-form-item>
            <el-form-item label="version">
                <el-input type="text" v-model="tempModule.version" placeholder="模型的版本信息" style="width: 40%">
                </el-input>
            </el-form-item>
          <el-form-item label="预处理状态">
            <el-input type="text" autosize v-model="tempModule.opencv" style="width: 40%">
            </el-input>
          </el-form-item>
            <!-- <el-form-item label="同步路径">
                <el-input type="text" v-model="tempModule.syncPath" placeholder="边缘端上检测模块存储路径" style="width: 40%">
                </el-input>
            </el-form-item>
            <el-form-item label="发布命令">
                <el-input type="textarea" v-model="tempModule.commandScript" placeholder="多条命令以回车分隔" style="width: 40%">
                </el-input>
            </el-form-item>
            <el-form-item label="模型的RabbitMQ的队列" required>
                <el-input type="textarea" v-model="tempModule.mqQueue" placeholder="此检测模块消息交换的队列名" style="width: 40%">
                </el-input>
            </el-form-item>  -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus==='create'" type="success" @click="createModule">创 建</el-button>
            <el-button type="primary" v-else @click="updateModule">修 改</el-button>
        </div>
    </el-dialog>
    <el-dialog title="模型上传" :visible.sync="uploadVisible" width="30%">
        <el-upload ref="upload" style="width: 40%" drag multiple :auto-upload="false" :action="uploadUrl" :limit="1" :data="uploadData" :file-list="fileList" :before-upload="handleBeforeUpload" :before-remove="beforeRemove" :on-error="handleUploadError" :on-exceed="handleExceed" :on-success="handleUploadSuccess">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 56%;" size="small" type="success" @click="handleUpload">上传到服务器</el-button>
            <div style="white-space:nowrap" slot="tip" class="el-upload__tip">只能上传zip文件，且一次文件不超过500MB</div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
            <el-button @click="uploadVisible = false">取 消</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import DatePicker from "@/components/DatePicker"
import waves from '@/directives/waves/index.js' // 水波纹指令
export default {
    components: {
        DatePicker,
    },
    directives: {
        waves
    },
    data() {
        return {
            totalCount: 0, //分页组件--数据总条数
            list: [], //表格的数据
            listLoading: false, //数据加载等待动画
            listQuery: {
                pageNum: 1, //页码
                pageRow: 50, //每页条数
                areaId: null,
                edgeName: null,
                moduleName: null,
                updateTimeFrom: null,
                updateTimeTo: null
            },
            edgeEnds: [], //边缘端信息列表
            defaultProps: {
                children: "children",
                label: "name",
                value: "id",
                level: "level",
                emitPath: false //在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
            },
            dialogStatus: 'create',
            dialogFormVisible: false,
            textMap: {
                update: '编辑',
                create: '新建'
            },
            statusMap: {
                1: '创建',
                2: '上传成功',
                3: '同步成功',
                4: '发布中',
                6: '同步失败',
                7: '发布失败',
                8: '停止中',
                9: '停止',
                10: '同步中',
                200: '正常运行',
                201: '无任务运行'
            },
            tempModule: {
                id: null,
                edgeId: null,
                edgeName: null,
                moduleName: null,
                moduleType: null,
                description: null,
                version: null,
                storagePath: null,
                syncPath: null,
                commandScript: null,
                mqQueue: null,
                opencv:null
            },
            uploadUrl: process.env.NODE_ENV === 'production' ? '/analyticsModule/upload' : process.env.BASE_URL + '/analyticsModule/upload',
            fileList: [],
            uploadData: {
                moduleId: null
            },
            uploadVisible: false,
        }
    },
    created() {
      document.body.style.zoom = "80%";
        this.getList();
    },
    methods: {
        getAllEdgeEnds() {
            this.api({
                url: "/common/getAllEdgeEnds",
                method: "get"
            }).then(data => {
                this.edgeEnds = data;
              console.log(data)
            })
        },
        getList() {
            //查询列表
            this.listLoading = true;
            this.api({
                url: "/analyticsModule/listAnalyticsModule",
                method: "get",
                params: this.listQuery
            }).then(data => {
                this.listLoading = false;
                this.list = data.list;
                this.totalCount = data.totalCount;
            })
        },
        //时间查询组件设置时间方法
        getTime(date) {
            this.listQuery.updateTimeFrom = date.updateTimeFrom;
            this.listQuery.updateTimeTo = date.updateTimeTo;
        },
        handleSizeChange(val) {
            //改变每页数量
            this.listQuery.pageRow = val
            this.handleFilter();
        },
        handleCurrentChange(val) {
            //改变页码
            this.listQuery.pageNum = val
            this.getList();
        },
        handleFilter() {
            //查询事件
            this.listQuery.pageNum = 1
            this.getList()
        },
        getIndex($index) {
            //表格序号
            return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
        },
        showCreate() {
            if (this.edgeEnds.length === 0) {
                this.getAllEdgeEnds();
            }
            //显示新增对话框
            this.tempModule.edgeId = "";
            this.tempModule.edgeName = "";
            this.tempModule.moduleName = "";
            this.tempModule.moduleType = "";
            this.tempModule.description = "";
            this.tempModule.version = "";
            this.tempModule.storagePath = "";
            this.tempModule.syncPath = "";
            this.tempModule.commandScript = "";
            this.tempModule.mqQueue = "";
            this.tempModule.opencv="";
            this.dialogStatus = "create"
            this.dialogFormVisible = true
        },
        showUpdate($index) {
            let module = this.list[$index];
            if (this.edgeEnds.length === 0) {
                this.getAllEdgeEnds();
            }
            this.tempModule.id = module.id;
            this.tempModule.edgeId = module.edgeId;
            this.tempModule.edgeName = module.edgeName;
            this.tempModule.moduleName = module.moduleName;
            this.tempModule.moduleType = module.moduleType;
            this.tempModule.description = module.description;
            this.tempModule.version = module.version;
            this.tempModule.storagePath = module.storagePath;
            this.tempModule.syncPath = module.syncPath;
            this.tempModule.commandScript = module.commandScript;
            this.tempModule.mqQueue = module.mqQueue;
            this.tempModule.opencv=module.opencv;
            this.dialogStatus = "update"
            this.dialogFormVisible = true
        },
        showUpload($index) {
            let module = this.list[$index];
            this.uploadData.moduleId = module.id;
            this.uploadVisible = true


        },
        validate() {
            let u = this.tempModule
            if (u.edgeId.length === 0) {
                this.$message.warning('请选择边缘端信息')
                return false
            }
            if (u.moduleName.trim().length === 0) {
                this.$message.warning('请填写模型名称')
                return false
            }
     /*       if (u.mqQueue.trim().length === 0) {
                this.$message.warning('请填写RabbitMQ的队列名')
                return false
            }*/
            return true
        },
        createModule() {
            if (!this.validate()) return
            //添加新用户
            this.api({
                url: "/analyticsModule/addAnalyticsModule",
                method: "post",
                data: this.tempModule
            }).then(() => {
                this.getList();
                this.dialogFormVisible = false
                this.$message.success('新增成功！');
            })
        },
        updateModule() {
            if (!this.validate()) return
            //修改用户信息
            this.api({
                url: "/analyticsModule/updateAnalyticsModule",
                method: "post",
                data: this.tempModule
            }).then(() => {
                this.$message.success('更新成功！');
                this.dialogFormVisible = false;
                this.getList();
            })
        },
        syncFile($index) {
            let _vue = this;
            let module = _vue.list[$index];
            _vue.$confirm('确定同步模型?', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                _vue.listLoading = true;
                _vue.api({
                    url: "/analyticsModule/syncAnalyticsModule",
                    method: "post",
                    data: {
                        id: module.id,
                        edgeId: module.edgeId
                    }
                }).then(() => {
                    this.$message.success('同步成功！');
                    _vue.getList()
                }).catch(() => {
                    _vue.listLoading = false;
                })
            })
        },
        releaseModule($index) {
            let _vue = this;
            let module = _vue.list[$index];
            _vue.$confirm('确定发布模型?', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                _vue.listLoading = true;
                _vue.api({
                    url: "/analyticsModule/releaseAnalyticsModule",
                    method: "post",
                    data: {
                        id: module.id,
                        edgeId: module.edgeId
                    }
                }).then((data) => {
                    _vue.getList()
                    this.$alert(`<el-row><el-col style="white-space: pre-wrap;">${data}</el-col></el-row>`, '执行结果', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '确定',
                    });
                }).catch(error => {
                    _vue.listLoading = false;
                    if (error.code === '10012') {
                        _vue.instance = _vue.$notify({
                            title: '系统提示',
                            dangerouslyUseHTMLString: true,
                            message: `<p> ${error.msg} </p><p style='color:#43c39d'>点击此处进行修改</p>`,
                            duration: 0,
                            onClick: () => {
                                _vue.$router.replace({
                                    name: 'edgeInfo',
                                    params: {
                                        'edgeId': module.edgeId
                                    }
                                });
                                _vue.instance.close();
                            }
                        });
                    }else if (error.code === '10015') {
                        _vue.instance = _vue.$notify({
                            title: '系统提示',
                            dangerouslyUseHTMLString: true,
                            message: `<p> ${error.msg} </p><p style='color:#43c39d'>点击此处进行修改</p>`,
                            duration: 0,
                            onClick: () => {
                                _vue.$router.replace({
                                    name: 'cameraInfo'
                                });
                                _vue.instance.close();
                            }
                        });
                    }

                })
            })
        },
        newSyncFile($index) {
            let _vue = this;
            let module = _vue.list[$index];
            _vue.$confirm('确定同步模型?', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                _vue.listLoading = true;
                _vue.api({
                    url: "/analyticsModule/newSyncAnalyticsModule",
                    method: "post",
                    data: {
                        id: module.id,
                        edgeId: module.edgeId
                    }
                }).then(() => {
                    this.$message.success('同步中！');
                    _vue.getList()
                }).catch(() => {
                    _vue.listLoading = false;
                })
            })
        },
        commandModule($index,command) {
            let _vue = this;
            let module = _vue.list[$index];
            let tips;
            if (command === 'start'){
                tips = '确定发布模型?';
            }else if(command === 'close'){
                tips = '确定停止模型?';
            }else{
                return
            }
            _vue.$confirm('确定', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                _vue.listLoading = true;
                _vue.api({
                    url: "/analyticsModule/commandAnalyticsModule",
                    method: "post",
                    data: {
                        id: module.id,
                        edgeId: module.edgeId,
                        commandStatus:command
                    }
                }).then(() => {
                    _vue.getList()
                }).catch(() => {
                    _vue.listLoading = false;
                })
            })
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }?`);
        },
        handleUploadError(error, file) {

            this.$notify.error({
                title: 'error',
                message: '上传出错:' + error,
                type: 'error',
                position: 'bottom-right'
            })
        },
        //上传前的校验 可限制文件的类型和大小
        handleBeforeUpload(file) {
            console.log(file.type);
            const isZip = ['application/zip', 'application/x-zip-compressed'].includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 500;
            if (!isZip) {
                this.$message.error('上传文件只能是zip格式的压缩包!');
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 500MB!');
            }
            return isZip && isLt2M;
        },
        // 文件上传成功时的函数
        handleUploadSuccess(res, file, fileList) {
            if (res.code === '200') {
                this.$message.success('上传成功！');
            } else {
                this.$message.error(res.msg);
            }
            this.$refs.upload.clearFiles();
            this.uploadVisible = false;
            this.getList();
        },
        // 弹窗里面确定按钮处理文件上传的函数
        handleUpload() {
            this.$refs.upload.submit();
        },
        handleDetail(row) {
            this.$router.push({
                name: 'moduleDetail',
                params: {
                    'moduleId': row.id
                }
            });
        }

    }
}
</script>

<style>
.el-range-input {
    padding-bottom: 10px;
}

.el-message-box {
    width: auto !important;
}
</style>
