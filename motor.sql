/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 80015
Source Host           : localhost:3306
Source Database       : motor

Target Server Type    : MYSQL
Target Server Version : 80015
File Encoding         : 65001

Date: 2025-04-01 13:53:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `accessory`
-- ----------------------------
DROP TABLE IF EXISTS `accessory`;
CREATE TABLE `accessory` (
  `id` int(10) NOT NULL COMMENT '配件ID',
  `type` tinyint(1) DEFAULT NULL COMMENT '类型',
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '型号',
  `manufacturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '厂家',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='配件表';

-- ----------------------------
-- Records of accessory
-- ----------------------------

-- ----------------------------
-- Table structure for `base_user`
-- ----------------------------
DROP TABLE IF EXISTS `base_user`;
CREATE TABLE `base_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `loginname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态(0:正常，1:冻结)',
  `wx_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '微信id',
  `create_id` int(10) unsigned DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) unsigned DEFAULT NULL COMMENT '创建日期',
  `update_id` int(10) unsigned DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) unsigned DEFAULT NULL COMMENT '更新日期',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `delete_id` int(10) unsigned DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(13) unsigned DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户基础表';

-- ----------------------------
-- Records of base_user
-- ----------------------------

-- ----------------------------
-- Table structure for `gateway`
-- ----------------------------
DROP TABLE IF EXISTS `gateway`;
CREATE TABLE `gateway` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网关名称',
  `serial_num` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网关序列号（MAC地址）',
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录密码',
  `online` tinyint(4) DEFAULT NULL COMMENT '在线状态： 0离线  1在线',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='网关表';

-- ----------------------------
-- Records of gateway
-- ----------------------------

-- ----------------------------
-- Table structure for `iac_rel_role_resource`
-- ----------------------------
DROP TABLE IF EXISTS `iac_rel_role_resource`;
CREATE TABLE `iac_rel_role_resource` (
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `resource_id` int(10) unsigned NOT NULL COMMENT '资源ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='角色和资源关联表';

-- ----------------------------
-- Records of iac_rel_role_resource
-- ----------------------------

-- ----------------------------
-- Table structure for `iac_rel_role_user`
-- ----------------------------
DROP TABLE IF EXISTS `iac_rel_role_user`;
CREATE TABLE `iac_rel_role_user` (
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='角色和用户关联表';

-- ----------------------------
-- Records of iac_rel_role_user
-- ----------------------------

-- ----------------------------
-- Table structure for `iac_resource`
-- ----------------------------
DROP TABLE IF EXISTS `iac_resource`;
CREATE TABLE `iac_resource` (
  `resource_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parent_id` int(10) DEFAULT '-1' COMMENT '父级id',
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `type` tinyint(1) DEFAULT NULL COMMENT '资源类型(0:菜单，1:权限)',
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单url',
  `icon` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单图标',
  `sort` int(2) NOT NULL DEFAULT '0' COMMENT '排序号',
  `authority` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '对应权限',
  `create_id` int(10) unsigned DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) unsigned DEFAULT NULL COMMENT '创建日期',
  `update_id` int(10) unsigned DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) unsigned DEFAULT NULL COMMENT '更新日期',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `delete_id` int(10) unsigned DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(13) unsigned DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`resource_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='工商业资源表';

-- ----------------------------
-- Records of iac_resource
-- ----------------------------

-- ----------------------------
-- Table structure for `iac_role`
-- ----------------------------
DROP TABLE IF EXISTS `iac_role`;
CREATE TABLE `iac_role` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `corp_id` int(10) unsigned NOT NULL COMMENT '公司ID',
  `desc` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='工商业角色表';

-- ----------------------------
-- Records of iac_role
-- ----------------------------

-- ----------------------------
-- Table structure for `iac_user`
-- ----------------------------
DROP TABLE IF EXISTS `iac_user`;
CREATE TABLE `iac_user` (
  `user_id` int(10) unsigned NOT NULL COMMENT '主键ID',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地址',
  `age` int(11) DEFAULT '0' COMMENT '年龄',
  `corp_id` int(10) DEFAULT NULL COMMENT '公司ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of iac_user
-- ----------------------------

-- ----------------------------
-- Table structure for `iot_corp`
-- ----------------------------
DROP TABLE IF EXISTS `iot_corp`;
CREATE TABLE `iot_corp` (
  `corp_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '企业ID',
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '企业名称',
  `login_name` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员登录名称',
  `password` char(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员登陆密码',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态(0:正常，1:冻结)',
  `create_id` int(10) unsigned DEFAULT NULL COMMENT '创建人',
  `create_time` bigint(20) unsigned DEFAULT NULL COMMENT '创建时间',
  `update_id` int(10) unsigned DEFAULT NULL COMMENT '更新人',
  `update_time` bigint(20) unsigned DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  `delete_id` int(10) unsigned DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(20) unsigned DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`corp_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业表';

-- ----------------------------
-- Records of iot_corp
-- ----------------------------

-- ----------------------------
-- Table structure for `iot_usr`
-- ----------------------------
DROP TABLE IF EXISTS `iot_usr`;
CREATE TABLE `iot_usr` (
  `usr_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `authentication` tinyint(1) DEFAULT NULL COMMENT '认证状态(0未认证、1已认证)',
  `online` tinyint(1) DEFAULT NULL COMMENT '在线状态(0在线、1离线)',
  `proj_id` int(10) unsigned NOT NULL COMMENT '所属项目',
  `activate_time` bigint(13) unsigned DEFAULT NULL COMMENT '激活时间',
  PRIMARY KEY (`usr_id`) USING BTREE,
  KEY `fk_usr__proj` (`proj_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of iot_usr
-- ----------------------------

-- ----------------------------
-- Table structure for `motor_basic_data`
-- ----------------------------
DROP TABLE IF EXISTS `motor_basic_data`;
CREATE TABLE `motor_basic_data` (
  `id` int(10) NOT NULL COMMENT '电动机ID',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '区域',
  `position_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '位号',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '名称',
  `model_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '型号',
  `frame_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '机座号',
  `polar_num` int(10) DEFAULT NULL COMMENT '极数',
  `rated_voltage` double(10,3) DEFAULT NULL COMMENT '额定电压',
  `rated_power` double(10,3) DEFAULT NULL COMMENT '额定功率',
  `rated_current` double(10,3) DEFAULT NULL COMMENT '额定电流',
  `rated_speed` int(10) DEFAULT NULL COMMENT '额定转速',
  `de_bearing` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '轴伸端轴承',
  `nde_bearing` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '非轴伸端轴承',
  `factory_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '出厂编号',
  `factory_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '出厂年月',
  `manufacturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '生产厂家',
  `oil_injection_amount` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '注油量(轴伸端/非轴伸端)',
  `oil_injection_period` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '注油周期(轴伸端/非轴伸端)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='电动机基础信息';

-- ----------------------------
-- Records of motor_basic_data
-- ----------------------------
INSERT INTO `motor_basic_data` VALUES ('1', '车间', '1', '车间1号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `motor_basic_data` VALUES ('2', '后勤室', '2', '后勤室1号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `motor_basic_data` VALUES ('3', '生产室', '3', '生产室1号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `motor_basic_data` VALUES ('4', '车间', '1', '车间2号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `motor_basic_data` VALUES ('5', '后勤室', '2', '后勤室1号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `motor_basic_data` VALUES ('6', '车间', '1', '车间3号', null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `motor_repair_records`
-- ----------------------------
DROP TABLE IF EXISTS `motor_repair_records`;
CREATE TABLE `motor_repair_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `motor_id` int(10) DEFAULT NULL COMMENT '电动机ID',
  `accessory_id` int(10) DEFAULT NULL COMMENT '配件ID',
  `type` int(1) DEFAULT NULL COMMENT '类型',
  `amount` double(10,3) DEFAULT NULL COMMENT '数量',
  `operator` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '操作人',
  `operator_id` int(10) DEFAULT NULL COMMENT '操作人ID',
  `motor_current_calculate_running_time` int(10) DEFAULT NULL COMMENT '电动机当前累计运行时长（分钟）',
  `time` bigint(13) DEFAULT NULL COMMENT '时间',
  `reference_time` int(10) DEFAULT NULL COMMENT '参考时长（分钟）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1820680203 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='电动机维修记录';

-- ----------------------------
-- Records of motor_repair_records
-- ----------------------------
INSERT INTO `motor_repair_records` VALUES ('1', '1', '1', '0', '50.000', '韩', null, null, '1743131011000', null, null);
INSERT INTO `motor_repair_records` VALUES ('2', '1', '1', '0', '60.000', '周', null, null, '1743131012000', null, null);
INSERT INTO `motor_repair_records` VALUES ('3', '1', '1', '0', '60.000', '黄', null, null, '1743131311000', null, null);
INSERT INTO `motor_repair_records` VALUES ('4', '1', '2', '1', '50.000', '周', null, null, '1743130011000', null, null);

-- ----------------------------
-- Table structure for `motor_running_data`
-- ----------------------------
DROP TABLE IF EXISTS `motor_running_data`;
CREATE TABLE `motor_running_data` (
  `id` int(10) NOT NULL COMMENT 'ID',
  `motor_id` int(10) DEFAULT NULL COMMENT '电动机ID',
  `motor_status` tinyint(3) DEFAULT NULL COMMENT '电动机状态: 0 正常  1 待维护  2 过期',
  `motor_running_status` tinyint(1) DEFAULT NULL COMMENT '电动机运行状态:  0 停机  1 运行  2 离线',
  `motor_start_time` bigint(13) DEFAULT NULL COMMENT '电动机启动时间',
  `motor_stop_time` bigint(13) DEFAULT NULL COMMENT '电动机停止时间',
  `motor_calculate_running_time` int(10) DEFAULT NULL COMMENT '电动机累计运行时长（分钟）',
  `de_running_time` int(10) DEFAULT NULL COMMENT '轴伸端本次运行时长（分钟）',
  `nde_running_time` int(10) DEFAULT NULL COMMENT '非轴伸端本次运行时长（分钟）',
  `bearing_running_time` int(10) DEFAULT NULL COMMENT '轴承本次运行时长(分钟)',
  `de_accumulate_oil_amount` double(10,3) DEFAULT NULL COMMENT '轴伸端累计加油量',
  `nde_accumulate_oil_amount` double(10,3) DEFAULT NULL COMMENT '非轴伸端累计加油量',
  `de_reference_time` int(10) DEFAULT NULL COMMENT '轴伸端参考时长（分钟）',
  `nde_reference_time` int(10) DEFAULT NULL COMMENT '非轴伸端参考时长（分钟）',
  `bearing_reference_time` int(10) DEFAULT NULL COMMENT '轴承参考时长（分钟）',
  `de_maintenance_time` bigint(13) DEFAULT NULL COMMENT '轴伸端本次维护时戳',
  `nde_maintenance_time` bigint(13) DEFAULT NULL COMMENT '非轴伸端本次维护时戳',
  `bearing_maintenance_time` bigint(13) DEFAULT NULL COMMENT '轴承本次维护时戳',
  `de_remaining_time` int(10) DEFAULT NULL COMMENT '轴伸端剩余时长（分钟）',
  `nde_remaining_time` int(10) DEFAULT NULL COMMENT '非轴伸端剩余时长（分钟）',
  `bearing_remaining_time` int(10) DEFAULT NULL COMMENT '轴承剩余时长（分钟）',
  `is_collect` tinyint(1) DEFAULT NULL COMMENT '是否采集:  0否 1是 ',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='电动机运行信息';

-- ----------------------------
-- Records of motor_running_data
-- ----------------------------
INSERT INTO `motor_running_data` VALUES ('1', '1', '0', '1', '123', '345', '200', '300', '40', '500', '600.000', '700.000', '3000', '4000', null, '1743131383000', '1743130383000', null, null, null, null, null);
INSERT INTO `motor_running_data` VALUES ('2', '2', '0', '2', '321', '543', null, '350', '50', '600', null, null, '3000', '4000', null, '1743131011000', '1743131015000', null, null, null, null, null);
INSERT INTO `motor_running_data` VALUES ('3', '3', '0', '1', '567', '891', '345', '400', '60', '700', null, null, '3000', '4000', null, '1743130383000', '1743130383000', null, null, null, null, null);
INSERT INTO `motor_running_data` VALUES ('4', '4', '0', '2', '234', '567', '400', '450', '70', '800', null, null, '3000', '4000', null, '1743131190000', '1743111190000', null, null, null, null, null);
INSERT INTO `motor_running_data` VALUES ('5', '5', '0', '1', null, null, null, '500', '80', '900', null, null, '3000', '4000', null, '1743130383000', '1743130353000', null, null, null, null, null);
INSERT INTO `motor_running_data` VALUES ('6', '6', '1', '2', null, null, null, '300', '40', '500', null, null, '3000', '4000', null, '1743131383000', '1743130383000', null, null, null, null, null);

-- ----------------------------
-- Table structure for `motor_running_records`
-- ----------------------------
DROP TABLE IF EXISTS `motor_running_records`;
CREATE TABLE `motor_running_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `motor_id` int(10) DEFAULT NULL COMMENT '电动机ID',
  `start_time` bigint(13) DEFAULT NULL COMMENT '启动时间',
  `stop_time` bigint(13) DEFAULT NULL COMMENT '停止时间',
  `motor_calculate_running_time` int(10) DEFAULT NULL COMMENT '电动机累计运行时长（分钟）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='电动机运行记录';

-- ----------------------------
-- Records of motor_running_records
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `org_id` int(10) unsigned NOT NULL COMMENT '部门id',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `fk_user__org` (`org_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL COMMENT '用户ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `loginname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '登录名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `create_id` int(10) DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) DEFAULT NULL COMMENT '创建时间',
  `update_id` int(10) DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态',
  `deleted` tinyint(1) DEFAULT NULL COMMENT '逻辑删除',
  `delete_id` int(10) DEFAULT NULL COMMENT '删除者',
  `delete_time` bigint(13) DEFAULT NULL COMMENT '删除时间',
  `wx_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '微信ID',
  `phone_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '手机号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
