package org.colorcoding.ibas.materials.logic;

import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.data.emDirection;
import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 物料批次记录契约，影响物料批次出入库记录
 * 
 * @author Niuren.Zhu
 *
 */
public interface IMaterialBatchJournalContract extends IBusinessLogicContract {
	/**
	 * 批次编号
	 *
	 * @return
	 */
	String getBatchCode();

	/**
	 * 物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 仓库
	 *
	 * @return
	 */
	String getWarehouse();

	/**
	 * 数量
	 *
	 * @return
	 */
	BigDecimal getQuantity();

	/**
	 * 方向
	 *
	 * @return
	 */
	emDirection getDirection();

	/**
	 * 单据类型
	 *
	 * @return
	 */
	String getDocumentType();

	/**
	 * 单据号
	 *
	 * @return
	 */
	Integer getDocumentEntry();

	/**
	 * 单据行号
	 *
	 * @return
	 */
	Integer getDocumentLineId();
}
